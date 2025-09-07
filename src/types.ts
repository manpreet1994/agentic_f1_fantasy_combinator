
export interface Player {
    id: string;
    name: string;
    team?: string;
    cost: number;
    type: 'driver' | 'constructor';
}

export interface SuggestedPlayer {
    name: string;
    cost: number;
    justification: string;
}

export interface SuggestedTeam {
    drivers: SuggestedPlayer[];
    constructors: SuggestedPlayer[];
    totalCost: number;
    budgetRemaining: number;
}

export interface ChipAdvice {
    useChip: boolean;
    chipName: string | null;
    justification: string;
}

export interface FantasyResponse {
    team: SuggestedTeam;
    chipAdvice: ChipAdvice;
    transfers?: {
        out: Player;
        in: Player;
        justification: string;
    }[];
}

export interface SelectedTeam {
    drivers: (Player | null)[];
    constructors: (Player | null)[];
}
