import { DialogProps } from "dialog-manager-react";
import { useForm } from "react-hook-form";
import { Difficulty, DifficultyLabels, Question } from "@trivia/shared/types";
import { useCallback } from "react";
import TextInput from "../components/TextInput";
import { useFetchQuestion, useModifyQuestion, useQuestions } from "../api/questions";
import { BaseDialog } from "./BaseDialog";
import SelectInput from "../components/SelectInput";
import { Button } from "../components/Button";

export interface ModifyQuestionDialogProps extends DialogProps {
  gameId: string;
  questionId?: string;
}

export default function ModifyQuestionDialog({ gameId, questionId, closeDialog, active }: ModifyQuestionDialogProps) {
  const { control, handleSubmit, reset } = useForm<Partial<Question>>();
  const modify = useModifyQuestion(gameId, questionId);
  const listQuestions = useQuestions(gameId);

  useFetchQuestion(gameId, questionId, reset);

  const submit = useCallback(
    async (data: Partial<Question>) => {
      modify.mutate(data, {
        onSuccess() {
          listQuestions.refetch();
          closeDialog();
        },
      });
    },
    [closeDialog, listQuestions, modify],
  );

  const prefix = questionId ? "Edit" : "Create";

  return (
    <BaseDialog closeDialog={closeDialog} active={active}>
      <h1 className="mb-4 text-2xl font-bold">{prefix} Question</h1>
      <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit(submit)}>
        <TextInput label="Question" name="value" control={control} defaultValue={""} />
        <TextInput label="Answer" name="answer" control={control} defaultValue={""} />
        <SelectInput label="Difficulty" name="difficulty" control={control} defaultValue={Difficulty.EASY}>
          {Object.values(Difficulty).map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {DifficultyLabels[difficulty]}
            </option>
          ))}
        </SelectInput>
        <Button type="submit">Save</Button>
      </form>
    </BaseDialog>
  );
}
