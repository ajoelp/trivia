import { useQuestions } from "../api/questions";
import { Column } from "react-table";
import { useMemo } from "react";
import { Question } from "../types/models";
import { Table } from "./Table";
import { Tooltip } from "./Tooltip";

interface QuestionsListProps {
  gameId: string;
}

export function QuestionsList({ gameId }: QuestionsListProps) {
  const { data, isLoading } = useQuestions(gameId);

  const columns = useMemo<Column<Question>[]>(() => {
    return [
      {
        Header: "Question",
        accessor: (question) => {
          return (
            <Tooltip value={question.value} className="max-w-full inline-block">
              <p dangerouslySetInnerHTML={{ __html: question.value }} className="truncate w-full" />
            </Tooltip>
          );
        },
      },
      {
        Header: "Answer",
        accessor: (question) => {
          return (
            <Tooltip value={question.answer} className="w-full inline-block">
              <p dangerouslySetInnerHTML={{ __html: question.answer }} className="truncate w-full" />
            </Tooltip>
          );
        },
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
      },
      {
        Header: "Actions",
        accessor: (value) => {
          return (
            <div className="flex gap-2">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          );
        },
      },
    ];
  }, []);

  return <Table columns={columns} data={data ?? []} />;
}
