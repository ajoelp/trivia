import { useQuery } from "react-query";
import { apiClient } from "./apiClient";
import { User } from "../types/models";

export function useCurrentUser() {
  return useQuery(
    ["current-user"],
    async () => {
      const { data } = await apiClient.get<User>("/auth/user");
      return data;
    },
    { retry: false },
  );
}
