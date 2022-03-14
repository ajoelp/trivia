import { useQuery } from "react-query";
import { apiClient } from "./apiClient";
import { Game } from "../types/models";

export function useGames() {
  return useQuery(["games"], async () => {
    const { data } = await apiClient.get<Game[]>("/games");
    return data;
  });
}

export function useGame(id: string) {
  return useQuery(["game", { id }], async () => {
    const { data } = await apiClient.get<Game>(`/games/${id}`);
    return data;
  });
}
