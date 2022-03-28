import { useGames } from "../api/games";
import { Column } from "react-table";
import { useMemo } from "react";
import { Game } from "../types/models";
import { Badge } from "./Badge";
import { CopyToClipboard } from "./CopyToClipboard";
import { DateTime } from "../services/dates";
import { Link } from "./Button";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { Table } from "./Table";

export function GamesTable() {
  const { data, isLoading } = useGames();

  const columns: Column<Game>[] = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Active",
        accessor: (originalRow) =>
          originalRow.active ? <Badge color="green">Active</Badge> : <Badge color="red">Inactive</Badge>,
      },
      {
        Header: "Code",
        accessor: (value) => <CopyToClipboard value={value.code} />,
      },
      {
        Header: "Created",
        accessor: (value) => `${DateTime.from(value.createdAt).toNow} ago`,
      },
      {
        Header: "Actions",
        width: "auto",
        accessor: (value) => {
          return (
            <Link variant="color" size="sm" href={routePath(RouteNames.EDIT_GAME, { id: value.id })}>
              Edit
            </Link>
          );
        },
      },
    ];
  }, []);

  return <Table columns={columns} data={data ?? []} />;
}
