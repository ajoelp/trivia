import React, { ReactNode, useCallback } from "react";
import { classNames } from "../services/utils";

type TableAccessor<DataType, ExtraProps> =
  | keyof DataType
  | ((data: DataType, index: number, extraProps?: ExtraProps) => ReactNode);

export type TableColumn<DataType, ExtraProps> = {
  keyAccessor?: (data: DataType) => string | number;
  className?: string;
  label: string;
  accessor: TableAccessor<DataType, ExtraProps>;
};

type TableProps<DataType, ExtraProps> = {
  columns: TableColumn<DataType, ExtraProps>[];
  data: DataType[];
  extraProps?: ExtraProps;
  emptyPlaceholder?: ReactNode;
};

export function Table<DataType, ExtraProps>({
  columns,
  data,
  extraProps,
  emptyPlaceholder,
}: TableProps<DataType, ExtraProps>) {
  const processColumn = useCallback(
    (accessor: TableAccessor<DataType, ExtraProps>, data: DataType, index: number): ReactNode => {
      if (typeof accessor === "function") {
        return accessor(data, index, extraProps);
      }
      return <>{data[accessor]}</>;
    },
    [extraProps],
  );

  return (
    <table className="w-full divide-y">
      <thead>
        <tr>
          {columns.map((column, key) => (
            <th
              className={classNames("whitespace-nowrap px-4 py-3.5 text-left text-sm font-semibold", column.className)}
              key={key}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.length <= 0 && emptyPlaceholder && (
          <tr>
            <td colSpan={columns.length}>{emptyPlaceholder}</td>
          </tr>
        )}
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, key) => (
              <td className={classNames("whitespace-nowrap px-4 py-2 text-sm", column.className)} key={key}>
                {processColumn(column.accessor, item, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
