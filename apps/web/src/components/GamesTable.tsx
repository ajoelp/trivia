import { useGames } from "../api/games";
import { Column, useFlexLayout, useTable } from "react-table";
import { useMemo } from "react";
import { Game } from "../types/models";
import { Badge } from "./Badge";
import { CopyToClipboard } from "./CopyToClipboard";

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
        accessor: "createdAt",
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
    <div {...getTableProps()} className="min-w-full divide-y divide-gray-600 h-full relative">
      <div className="sticky top-0 left-0 z-50 bg-gray-900">
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
      {/* Apply the table body props */}
      <div {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className="hover:bg-gray-600">
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
