import { useGames } from "../api/games";
import { Table, TableColumn } from "./Table";
import { Game } from "@trivia/shared/types";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { DateTime } from "../services/dates";
import { CopyToClipboard } from "./CopyToClipboard";
import { Badge } from "./Badge";

const columns: TableColumn<Game, any>[] = [
  {
    label: "Name",
    accessor: "name",
  },
  {
    label: "Active",
    accessor: (originalRow) =>
      originalRow.active ? <Badge color="green">Active</Badge> : <Badge color="red">Inactive</Badge>,
  },
  {
    label: "Code",
    accessor: (value) => <CopyToClipboard value={value.code} />,
  },
  {
    label: "Created",
    accessor: (value) => `${DateTime.from(value.createdAt).toNow} ago`,
  },
  {
    label: "Actions",
    className: "text-right",
    accessor: (value) => {
      return <a href={routePath(RouteNames.EDIT_GAME, { id: value.id })}>Edit</a>;
    },
  },
];

export function GamesTable() {
  const { data, isLoading } = useGames();
  return <Table columns={columns} data={data ?? []} emptyPlaceholder={<p>No Results</p>} />;
}
