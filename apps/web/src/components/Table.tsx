import React, { ReactNode, useCallback } from "react";
import { classNames } from "../services/utils";

import { Table as ChakraTable, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";

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
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {columns.map((column, key) => (
              <Th className={column.className} key={key}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length <= 0 && emptyPlaceholder && (
            <Tr>
              <Td colSpan={columns.length}>{emptyPlaceholder}</Td>
            </Tr>
          )}
          {data.map((item, index) => (
            <Tr key={index}>
              {columns.map((column, key) => (
                <Td className={column.className} key={key}>
                  {processColumn(column.accessor, item, index)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
