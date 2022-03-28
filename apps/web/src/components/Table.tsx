import { Column, useFlexLayout, useTable } from "react-table";
import { useCallback, useMemo } from "react";
import { classNames } from "../services/utils";
import { AutoHeightDiv } from "./AutoHeightDiv";
import { FixedSizeList } from "react-window";

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute("style", "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;");
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
};

export function Table<T extends object>({ columns, data }: TableProps<T>) {
  const defaultColumn = useMemo<Partial<Column<T>>>(
    () => ({
      minWidth: 150,
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
  );

  const cellStyles = classNames("px-4 h-[50px] flex items-center last:justify-end");

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="divide-x border-b"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className={cellStyles}>
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [cellStyles, prepareRow, rows],
  );

  return (
    <div {...getTableProps()} className="w-full flex-1 flex flex-col">
      <div className="bg-zinc-900 border-b" style={{ paddingRight: scrollbarWidth() }}>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="divide-x">
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className={`${cellStyles} text-sm font-medium uppercase text-zinc-400`}>
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <AutoHeightDiv {...getTableBodyProps()} className="flex-1 overflow-hidden">
        {(height) => (
          <FixedSizeList height={height} itemCount={rows.length} itemSize={50} width={"100%"}>
            {RenderRow}
          </FixedSizeList>
        )}
      </AutoHeightDiv>
    </div>
  );
}
