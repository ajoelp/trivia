import { useMutation, useQuery } from "react-query";
import { apiClient } from "./apiClient";
import { Game } from "../types/models";
import { Services } from "./services";
import { toast } from "../services/toast";

export function useGames() {
  return useQuery(["games"], async () => {
    const { data } = await apiClient.get<Game[]>("/games");
    return data;
  });
}

type OnSuccess = (game: Game) => void;
export function useGame(id?: string, onSuccess?: OnSuccess) {
  return useQuery(["game", { id }], () => Services.games.fetch(id), { enabled: id != null, onSuccess });
}

export function useCreateGame() {
  return useMutation(Services.games.create, {
    onSuccess: () => {
      toast.success("Game created");
    },
    onError: (error) => {
      toast.error("There was an error creating your game");
    },
  });
}

export function useUpdateGame(id?: string) {
  return useMutation((game: Partial<Game>) => Services.games.update(id ?? "", game), {
    onSuccess: () => {
      toast.success("Game created");
    },
    onError: (error) => {
      toast.error("There was an error creating your game");
    },
  });
}
