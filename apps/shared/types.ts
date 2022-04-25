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
    PENDING = 'pending',
    STARTED = 'started',
    QUESTION_ASKED = 'question-asked',
    ANSWERS_REQUIRED = 'answers-required',
    HOST_EVALUATING = 'host-evaluating',
    SHOWING_SCORES = 'showing-scores',
    COMPLETE = 'complete'
}

export interface TeamMember {
    id: string
    name: string
}

export interface Team {
    id: string
    name: string
    members: TeamMember[]
}


export interface Answer {
    answer?: string,
    isCorrect?: boolean
}

export interface QuestionAnswers {
    questionId: string
    answers: {
        [teamId: string]: Answer
    }
}

export interface GameState {
    state: GameStates
    currentQuestionId?: string
    teams: Team[]
    answers: QuestionAnswers[]
}