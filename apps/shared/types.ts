export interface User {
    id: string;
    email: string;
}

export interface Game {
    id: string;
    name: string;
    active: boolean;
    code: string;
    state: Record<string, any>;
    createdAt: string;
    authorId: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const DifficultyLabels: Record<Difficulty, string> = {
    [Difficulty.EASY]: "Easy",
    [Difficulty.MEDIUM]: "Medium",
    [Difficulty.HARD]: "Hard",
};

export interface Question {
    id: string;
    value: string;
    answer: string;
    difficulty: Difficulty;
    createdAt: string;
    gameId: string;
}

export interface GameWithAuthor extends Game {
    author: User;
}

export enum GameStates {
    PENDING = 'pending'
}

export interface TeamMember {
    uuid: string
    name: string
}

export interface Team {
    name: string
    clients: TeamMember[]
}

export interface GameState {
    state: GameStates.PENDING
    teams: []
}