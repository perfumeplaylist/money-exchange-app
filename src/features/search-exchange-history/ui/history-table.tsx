import { useMemo, memo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createColumns } from "./columns";
import { history_query_option } from "../model/query.option";
import { calculateColumnWidths } from "../utils";
import TableHeader from "./table-header";
import TableBody from "./table-body";

const HistoryTable = memo(() => {
  const { data: historyData } = useSuspenseQuery({
    ...history_query_option.getHistory(),
    refetchOnMount: "always",
  });

  const columns = useMemo(() => createColumns(), []);

  const { columnWidths } = useMemo(() => calculateColumnWidths(columns), [columns]);

  const table = useReactTable({
    data: historyData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto overflow-y-auto pt-4 pb-4 rounded-[16px] border border-border-gray-200 bg-white max-h-[552px]">
      <table className="w-full border-collapse">
        <TableHeader table={table} columnWidths={columnWidths} />
        <TableBody table={table} historyData={historyData} columnWidths={columnWidths} />
      </table>
    </div>
  );
});

HistoryTable.displayName = "HistoryTable";

export default HistoryTable;
