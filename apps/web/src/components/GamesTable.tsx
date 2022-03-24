import { useGames } from "../api/games";
import { Column, useFlexLayout, useTable } from "react-table";
import { useMemo } from "react";
import { Game } from "../types/models";
import { Badge } from "./Badge";
import { CopyToClipboard } from "./CopyToClipboard";
import Loader from "./Loader";
import { DateTime } from "../services/dates";
import { Link } from "./Button";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";

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
        accessor: (value) => {
          return <Link href={routePath(RouteNames.EDIT_GAME, { id: value.id })}>Edit</Link>;
        },
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      data: data ?? [],
      columns,
    },
    useFlexLayout,
  );

  return (
    <div {...getTableProps()} className="min-w-full divide-y divide-zinc-600 h-full relative">
      <div className="sticky top-0 left-0 z-50 bg-zinc-900">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps()}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {isLoading && (
          <div className="px-6 py-4 flex items-center gap-2 text-white">
            <Loader className="w-5 h-5" />
            Loading
          </div>
        )}
        {rows.length === 0 && <div className="px-6 py-4 flex items-center gap-2 text-white">No Results</div>}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className="hover:bg-zinc-600">
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm">
                    {cell.render("Cell")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
