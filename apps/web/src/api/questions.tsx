import { useQuery } from "react-query";
import { Services } from "./services";

export function useQuestions(gameId: string) {
  return useQuery(["questions", { gameId }], () => {
    return Services.questions.list(gameId);
  });
}
