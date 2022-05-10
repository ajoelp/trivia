import { GameStateProps } from "./shared";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { BigInput } from "../../../components/BigInput";
import { useLocalStorage } from "usehooks-ts";

interface QuestionAskedForm {
  answer: string;
}

export default function QuestionAsked({ question, game, instance, gameState }: GameStateProps) {
  const { control, handleSubmit } = useForm<QuestionAskedForm>();
  const [teamId] = useLocalStorage<string>("teamId", "");

  const currentQuestionAnswers = useMemo(
    () =>
      gameState.answers.find((answer) => {
        return answer.questionId === question?.id;
      })?.answers?.[teamId],
    [gameState.answers, question?.id, teamId],
  );

  const onSubmit = useCallback(
    (data: QuestionAskedForm) => {
      if (!question || !teamId) return;
      instance.answerQuestion({
        questionId: question.id,
        teamId,
        answer: data.answer,
      });
    },
    [instance, question, teamId],
  );

  return (
    <Box>
      <Heading>{question?.value}</Heading>
      <Box mt="8" as="form" onSubmit={handleSubmit(onSubmit)}>
        <BigInput
          label="Your Answer"
          name="answer"
          control={control}
          defaultValue={currentQuestionAnswers?.answer ?? ""}
        />
        <Button type="submit" size="lg" mt="2" colorScheme="secondary" width="100%">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
