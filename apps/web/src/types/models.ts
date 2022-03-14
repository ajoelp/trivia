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

export interface GameWithAuthor extends Game {
  author: User;
}
