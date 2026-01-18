import { useMemo } from "react";
import { flexRender, type Table } from "@tanstack/react-table";
import { getColumnId } from "../utils";
import type { GetOrdersResponse } from "@/entities/orders/model/types";

type TableBodyProps = {
  table: Table<GetOrdersResponse>;
  historyData: GetOrdersResponse[];
  columnWidths: Record<string, number>;
}

const TableBody = ({ table, historyData, columnWidths }: TableBodyProps) => {
  const TableBodyContent = useMemo(() => {
    if (historyData.length === 0) {
      return (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="px-4 py-8 text-center text-sm text-text-secondary min-h-[552px]"
          >
            데이터가 없습니다
          </td>
        </tr>
      );
    }

    const rows = table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => {
          const columnId = getColumnId(cell.column);
          const width = columnWidths[columnId] || 0;

          return (
            <td
              key={cell.id}
              className="bg-white h-[49px]"
              style={{
                minWidth: `${width}px`,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    ));

    // 빈 공간 채우기
    const remainingHeight = 552 - table.getRowModel().rows.length * 49;
    if (remainingHeight > 0) {
      rows.push(
        <tr key="spacer">
          <td
            colSpan={table.getAllColumns().length}
            className="h-[1px]"
            style={{ height: `${remainingHeight}px` }}
          />
        </tr>
      );
    }

    return rows;
  }, [historyData.length, table, columnWidths]);

  return <tbody>{TableBodyContent}</tbody>;
};

export default TableBody;
