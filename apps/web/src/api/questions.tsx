import { useMutation, useQuery } from "react-query";
import { Services } from "./services";
import { Question } from "@trivia/shared/types";
import { toast } from "../services/toast";

export function useQuestions(gameId: string) {
  return useQuery(["questions", { gameId }], () => {
    return Services.questions.list(gameId);
  });
}

type OnSuccess = (question: Question) => void;
export function useFetchQuestion(gameId: string, questionId?: string, onSuccess?: OnSuccess) {
  return useQuery(["question", { gameId, questionId }], () => Services.questions.fetch(gameId, questionId as string), {
    enabled: questionId != null,
    onSuccess,
  });
}

export function useModifyQuestion(gameId: string, questionId?: string) {
  return useMutation(
    (payload: Partial<Question>) => {
      return questionId
        ? Services.questions.update(gameId, questionId, payload)
        : Services.questions.create(gameId, payload);
    },
    {
      onSuccess: () => {
        toast.success("Question Saved");
      },
      onError: () => {
        toast.error("There was an error saving your question");
      },
    },
  );
}
