import { DialogProps } from "dialog-manager-react";
import { useForm } from "react-hook-form";
import { Difficulty, DifficultyLabels, Question } from "@trivia/shared/types";
import { useCallback } from "react";
import TextInput from "../components/TextInput";
import { useFetchQuestion, useModifyQuestion, useQuestions } from "../api/questions";
import { BaseDialog } from "./BaseDialog";
import SelectInput from "../components/SelectInput";

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
      <p className="text-xl font-bold mb-2">{prefix} Question</p>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <TextInput label="Question" name="value" control={control} defaultValue={""} />
        <TextInput label="Answer" name="answer" control={control} defaultValue={""} />
        <SelectInput label="Difficulty" name="difficulty" control={control} defaultValue={Difficulty.EASY}>
          {Object.values(Difficulty).map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {DifficultyLabels[difficulty]}
            </option>
          ))}
        </SelectInput>
        <button type="submit">Save</button>
      </form>
    </BaseDialog>
  );
}
