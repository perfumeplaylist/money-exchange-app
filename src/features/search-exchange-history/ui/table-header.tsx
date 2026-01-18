import { flexRender, type Table } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { getColumnIdFromHeader, getRightAlignColumns } from "../utils";
import type { GetOrdersResponse } from "@/entities";

type TableHeaderProps<T extends GetOrdersResponse> = {
  table: Table<T>;
  columnWidths: Record<string, number>;
}

const TableHeader = ({ table, columnWidths }: TableHeaderProps<GetOrdersResponse>) => {
  const rightAlignColumns = getRightAlignColumns();

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            if (header.isPlaceholder) {
              return null;
            }

            const columnId = getColumnIdFromHeader(header);
            const width = columnWidths[columnId] || 0;
            const isRightAlign = rightAlignColumns.includes(columnId);
            const canSort = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted();

            return (
              <th
                key={header.id}
                className={`px-6 h-[49px] border-t border-b border-border-gray-200 bg-white ${isRightAlign ? "text-right" : "text-left"
                  } text-sm font-medium text-text-primary ${canSort ? "cursor-pointer select-none hover:bg-gray-50" : ""}`}
                style={{
                  minWidth: `${width}px`,
                }}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className={`flex items-center gap-2 ${isRightAlign ? "justify-end" : "justify-start"}`}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {canSort && (
                    <span className="inline-flex items-center">
                      {sortDirection === "asc" ? (
                        <ArrowUp className="w-4 h-4 text-text-secondary" />
                      ) : sortDirection === "desc" ? (
                        <ArrowDown className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 text-text-secondary opacity-40" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
