import { useQuery } from "react-query";
import { apiClient } from "./apiClient";
import { User } from "@trivia/shared/types";

export function useCurrentUser(enabled: boolean = true) {
  return useQuery(
    ["current-user"],
    async () => {
      const { data } = await apiClient.get<User>("/auth/user");
      return data;
    },
    { retry: false, enabled },
  );
}
