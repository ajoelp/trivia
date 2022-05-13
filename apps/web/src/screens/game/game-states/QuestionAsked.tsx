import { GameStateProps } from "./shared";
import { useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { BigInput } from "../../../components/BigInput";
import { useTeamId } from "../../../services/useTeamId";
import { Button } from "../../../components/Button";

interface QuestionAskedForm {
  answer: string;
}

export default function QuestionAsked({ question, game, instance, gameState }: GameStateProps) {
  const { control, handleSubmit } = useForm<QuestionAskedForm>();
  const { teamId } = useTeamId();

  const currentQuestionAnswers = useMemo(
    () =>
      gameState.answers.find((answer) => {
        return answer.questionId === question?.id;
      })?.answers?.[teamId as string],
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
    <div className="w-full max-w-lg mx-auto my-auto">
      <h1 className="text-2xl font-extrabold">{question?.value}</h1>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <BigInput
          label="Your Answer"
          name="answer"
          control={control}
          defaultValue={currentQuestionAnswers?.answer ?? ""}
        />
        <Button type="submit" variant="big-ol-button" className="mt-8 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
