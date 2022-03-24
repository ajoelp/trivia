import { Game } from "../types/models";
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
  },
};
