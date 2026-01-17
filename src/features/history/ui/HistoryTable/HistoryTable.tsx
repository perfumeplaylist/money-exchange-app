import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { HistoryItem } from "@/entities/history/api/history.api";
import { createColumns } from "./columns";

type HistoryTableProps = {
  data: HistoryItem[];
};

const HistoryTable = ({ data }: HistoryTableProps) => {
  const columns = createColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto pt-4 pb-4 rounded-[16px] border border-border-gray-200 bg-white">
      <table className="w-full border-collapse bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return null;
                }
                const columnId = header.column.id;
                const widthMap: Record<string, string> = {
                  orderId: "min-w-[263px]",
                  orderedAt: "min-w-[180px]",
                  fromAmount: "min-w-[263px] ",
                  appliedRate: "min-w-[263px] ",
                  toAmount: "min-w-[263px] ",
                };
                const rightAlignColumns = [
                  "fromAmount",
                  "appliedRate",
                  "toAmount",
                ];
                const isRightAlign = rightAlignColumns.includes(columnId);
                return (
                  <th
                    key={header.id}
                    className={`px-6 h-[49px] border-t border-b border-border-gray-200 bg-white ${
                      isRightAlign ? "text-right" : "text-left"
                    } text-sm font-medium text-text-primary ${
                      widthMap[columnId] || ""
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-4 py-8 text-center text-sm text-text-secondary"
              >
                데이터가 없습니다
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id;
                  const widthMap: Record<string, string> = {
                    orderId: "min-w-[263px]",
                    orderedAt: "min-w-[180px]",
                    fromAmount: "min-w-[263px] ",
                    appliedRate: "min-w-[263px] ",
                    toAmount: "min-w-[263px] ",
                  };
                  return (
                    <td
                      key={cell.id}
                      className={`bg-white h-[49px] ${
                        widthMap[columnId] || ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
