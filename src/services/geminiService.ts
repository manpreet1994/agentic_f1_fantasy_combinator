import { GoogleGenAI, Type } from "@google/genai";
import type { FantasyResponse, Player, SelectedTeam } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    team: {
      type: Type.OBJECT,
      properties: {
        drivers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              cost: { type: Type.NUMBER },
              justification: { type: Type.STRING },
            },
            required: ["name", "cost", "justification"],
          },
        },
        constructors: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              cost: { type: Type.NUMBER },
              justification: { type: Type.STRING },
            },
            required: ["name", "cost", "justification"],
          },
        },
        totalCost: { type: Type.NUMBER },
        budgetRemaining: { type: Type.NUMBER },
      },
      required: ["drivers", "constructors", "totalCost", "budgetRemaining"],
    },
    chipAdvice: {
      type: Type.OBJECT,
      properties: {
        useChip: { type: Type.BOOLEAN },
        chipName: { type: Type.STRING, nullable: true },
        justification: { type: Type.STRING },
      },
      required: ["useChip", "justification"],
    },
    transfers: {
      type: Type.ARRAY,
      nullable: true,
      items: {
        type: Type.OBJECT,
        properties: {
          out: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              team: { type: Type.STRING, nullable: true },
              cost: { type: Type.NUMBER },
              type: { type: Type.STRING, enum: ['driver', 'constructor'] },
            },
            required: ["id", "name", "cost", "type"]
          },
          in: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              team: { type: Type.STRING, nullable: true },
              cost: { type: Type.NUMBER },
              type: { type: Type.STRING, enum: ['driver', 'constructor'] },
            },
            required: ["id", "name", "cost", "type"]
          },
          justification: { type: Type.STRING },
        },
        required: ["out", "in", "justification"],
      },
    },
  },
  required: ["team", "chipAdvice"],
};


const generatePrompt = (currentTeam: SelectedTeam | null, fantasyData: Player[]): string => {
    const dataString = JSON.stringify(fantasyData, null, 2);

    const basePrompt = `
You are a world-class F1 Fantasy analyst. Your task is to analyze data for the next upcoming Grand Prix and provide fantasy team advice. The total budget is $100.0M. The team must consist of 5 drivers and 2 constructors.

Use the following data for all available drivers and constructors for the 2025 season:
${dataString}

Also, consider these fictional recent practice session results from the track, which are a strong indicator of current form:
- Carlos Sainz has had an immediate impact at Williams; their car looks incredibly competitive, reflected in both his and the team's rising fantasy price.
- Mercedes seems to be slightly off the pace of the top 3, making George Russell and Kimi Antonelli interesting differential picks if they can unlock performance. Their prices have dipped slightly.
- McLaren and Ferrari are neck-and-neck, looking like the closest challengers to Red Bull. Lando Norris and Charles Leclerc are premium but reliable options.
- The RB team continues to impress as 'best of the rest'. Yuki Tsunoda and Isack Hadjar are both outperforming their price points, which have started to climb.
- Rookie Kimi Antonelli's price is rising on pure hype, but practice suggests he is a genuine talent.

For each selection or transfer, provide a concise justification (max 20 words) based on their price, form, practice performance, or potential.
Also, advise on whether to use a fantasy chip (e.g., 'Wildcard', 'Limitless') for this race and provide a reason.
Return your response strictly in the specified JSON format.
`;

    if (currentTeam) {
        const teamString = JSON.stringify({
            drivers: currentTeam.drivers.filter(Boolean).map(d => ({ name: d?.name, cost: d?.cost })),
            constructors: currentTeam.constructors.filter(Boolean).map(c => ({ name: c?.name, cost: c?.cost }))
        }, null, 2);
        return `${basePrompt}
A user has submitted their current team for optimization:
${teamString}

Based on all information, suggest 1 to 3 strategic transfers to improve the team. Present the final optimized team. If no changes are recommended, return the original team and set the 'transfers' array to be empty.
`;
    }

    return `${basePrompt}
Construct an optimal brand new team based on all the information provided.
`;
};


export const suggestNewTeam = async (fantasyData: Player[]): Promise<FantasyResponse> => {
    const prompt = generatePrompt(null, fantasyData);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
        },
    });

    const jsonText = response.text;
    return JSON.parse(jsonText) as FantasyResponse;
};


export const optimizeExistingTeam = async (currentTeam: SelectedTeam, fantasyData: Player[]): Promise<FantasyResponse> => {
    const prompt = generatePrompt(currentTeam, fantasyData);
     const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
        },
    });

    const jsonText = response.text;
    return JSON.parse(jsonText) as FantasyResponse;
};
