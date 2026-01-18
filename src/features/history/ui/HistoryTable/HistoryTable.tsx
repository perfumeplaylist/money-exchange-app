import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import history_query_option from "../../model/query.option";



const HistoryTable = () => {

  const { data: historyData } = useSuspenseQuery({
    ...history_query_option.getHistory()
  });

  const columns = createColumns();



  const table = useReactTable({
    data: historyData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto pt-4 pb-4 rounded-[16px] border border-border-gray-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return null;
                }
                const columnId = header.column.id;
                // TODO:리펙토링
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
                    className={`px-6 h-[49px] border-t border-b border-border-gray-200 bg-white ${isRightAlign ? "text-right" : "text-left"
                      } text-sm font-medium text-text-primary ${widthMap[columnId] || ""
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
          {historyData.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-4 py-8 text-center text-sm text-text-secondary min-h-[552px]"
              >
                데이터가 없습니다
              </td>
            </tr>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    // TODO:리펙토링
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
                        className={`bg-white h-[49px] ${widthMap[columnId] || ""
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
              ))}
              {table.getRowModel().rows.length * 49 < 552 && (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="h-[1px]"
                    style={{ height: `${552 - table.getRowModel().rows.length * 49}px` }}
                  />
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
