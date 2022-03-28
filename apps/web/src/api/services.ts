import { Game, Question } from "../types/models";
import { apiClient } from "./apiClient";

export const Services = {
  games: {
    fetch: async (id?: string) => {
      const { data } = await apiClient.get<Game>(`/games/${id}`);
      return data;
    },
    create: async (game: Partial<Game>) => {
      const { data } = await apiClient.post<Game>("/games", game);
      return data;
    },
    update: async (id: string, game: Partial<Game>) => {
      const { data } = await apiClient.patch<Game>(`/games/${id}`, game);
      return data;
    },
    list: async () => {
      const { data } = await apiClient.get<Game[]>("/games");
      return data;
    },
  },
  questions: {
    list: async (gameId: string) => {
      const { data } = await apiClient.get<Question[]>(`/games/${gameId}/questions`);
      return data;
    },
    fetch: async (gameId: string, id: string) => {
      const { data } = await apiClient.get<Question>(`/games/${gameId}/questions/${id}`);
      return data;
    },
    create: async (gameId: string, question: Partial<Question>) => {
      const { data } = await apiClient.post<Question>(`/games/${gameId}/questions`, question);
      return data;
    },
    update: async (gameId: string, id: string, question: Partial<Question>) => {
      const { data } = await apiClient.patch<Question>(`/games/${gameId}/questions/${id}`, question);
      return data;
    },
  },
};
