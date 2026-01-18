import { flexRender, type Table } from "@tanstack/react-table";
import { getColumnIdFromHeader, getRightAlignColumns } from "../utils";
import type { HistoryItem } from "@/entities";

type TableHeaderProps<T extends HistoryItem> = {
  table: Table<T>;
  columnWidths: Record<string, number>;
}

const TableHeader = ({ table, columnWidths }: TableHeaderProps<HistoryItem>) => {
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

            return (
              <th
                key={header.id}
                className={`px-6 h-[49px] border-t border-b border-border-gray-200 bg-white ${isRightAlign ? "text-right" : "text-left"
                  } text-sm font-medium text-text-primary`}
                style={{
                  minWidth: `${width}px`,
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
