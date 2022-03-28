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

export interface Question {
  id: string;
  value: string;
  answer: string;
  difficulty: string;
  createdAt: string;
  gameId: string;
}

export interface GameWithAuthor extends Game {
  author: User;
}
