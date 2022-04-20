import { useQuestions } from "../api/questions";
import { Table, TableColumn } from "./Table";
import { useEffect, useMemo, useState } from "react";
import { Question } from "@trivia/shared/types";
import { useDialogs } from "../dialogs/DialogManager";

interface QuestionsListProps {
  gameId: string;
}

export function QuestionsList({ gameId }: QuestionsListProps) {
  const { data, isLoading } = useQuestions(gameId);
  const { openDialog } = useDialogs();

  const columns = useMemo<TableColumn<Question, any>[]>(() => {
    return [
      { label: "Question", accessor: (data) => <p dangerouslySetInnerHTML={{ __html: data.value }} /> },
      { label: "Answer", accessor: (data) => <p dangerouslySetInnerHTML={{ __html: data.answer }} /> },
      { label: "Difficulty", accessor: (data) => <p>{data.difficulty}</p> },
      {
        label: "Actions",
        className: "text-right",
        accessor: (data) => (
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                openDialog("modifyQuestion", {
                  gameId: data.gameId,
                  questionId: data.id,
                });
              }}
            >
              Edit
            </button>
            <button>Delete</button>
          </div>
        ),
      },
    ];
  }, []);

  return <Table columns={columns} data={data ?? []} emptyPlaceholder={<p>No Content</p>} />;
}
