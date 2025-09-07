import type { Player } from '../types';

// The target API endpoint for the 2025 season.
const TARGET_API_URL = "https://f1fantasytools.com/api/statistics/2025";
// We use a CORS proxy to bypass the browser's same-origin policy restrictions for client-side API calls.
const PROXIED_API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(TARGET_API_URL)}`;


/**
 * Interface representing a player from the F1 Fantasy Tools API.
 * This can be either a driver or a constructor. Assumes the API response
 * contains a 'position' field to distinguish between them.
 */
interface ApiPlayer {
    id: number;
    display_name: string;
    team_name: string;
    price: number;
    position: 'Driver' | 'Constructor';
}

/**
 * A helper function to fetch data with a timeout and detailed error handling.
 */
const fetchWithTimeout = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, { signal });
    if (!response.ok) {
        const errorText = await response.text();
        
        // Log the exact error details to the console for debugging.
        console.error("--- F1 Fantasy API Call Failed ---");
        console.error("Request URL:", url);
        console.error("Response Status:", `${response.status} ${response.statusText}`);
        console.error("Full Response Body:", errorText);
        console.error("---------------------------------");

        let errorMessage = `API Error: ${response.status} ${response.statusText} for URL: ${url}.\n`;

        if (response.status === 503 || response.status === 504) {
             errorMessage += "This suggests the F1 Fantasy API is temporarily unavailable or overloaded.";
        } else if (response.status === 404) {
            errorMessage += "The requested API endpoint was not found. The URL may have changed.";
        } else {
            errorMessage += "An unexpected error occurred with the remote service.";
        }
         if (errorText) {
            errorMessage += `\n\nDetails: ${errorText}`;
        }
        throw new Error(errorMessage);
    }
    return response.json();
};


/**
 * Fetches the latest F1 fantasy data from a single endpoint.
 * @returns {Promise<Player[]>} A promise that resolves to an array of all players (drivers and constructors).
 * @throws Will throw a detailed error if the API call fails, times out, or the response is invalid.
 */
export const fetchFantasyData = async (): Promise<Player[]> => {
    const controller = new AbortController();
    const TIMEOUT_MS = 15000; // Increased to 15 seconds as the proxy can be slow.
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        // Fetch the unified player data from the single endpoint, routed through our CORS proxy.
        const apiPlayers = await fetchWithTimeout(PROXIED_API_URL, controller.signal) as ApiPlayer[];

        clearTimeout(timeoutId);

        if (!Array.isArray(apiPlayers) || apiPlayers.length === 0) {
            throw new Error("API returned empty or invalid data. The response format might have changed or the service is having issues.");
        }

        // Map the unified API response to the internal Player type.
        const mappedPlayers: Player[] = apiPlayers.map(p => {
            const isDriver = p.position === 'Driver';
            return {
                id: `${isDriver ? 'd' : 'c'}${p.id}`,
                name: p.display_name,
                team: isDriver ? p.team_name : undefined,
                cost: p.price,
                type: isDriver ? 'driver' : 'constructor'
            };
        });

        return mappedPlayers;

    } catch (error) {
        clearTimeout(timeoutId);
        // Log the full error object for developers
        console.error("Error fetching or mapping fantasy data:", error);

        // Provide a more user-friendly error message for timeouts.
        if (error instanceof DOMException && error.name === 'AbortError') {
             throw new Error(`The request for live F1 data timed out after ${TIMEOUT_MS / 1000} seconds. The public API proxy can sometimes be slow. Please try again or use the sample data.`);
        }
        
        // Re-throw other errors to be handled and displayed by the UI.
        throw error;
    }
};