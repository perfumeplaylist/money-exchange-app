import { columnWidth } from "../model/column.width";
import { TABLE_COLUMN_RIGHT_ALIGN_COLUMNS } from "../model/constant";

const HistoryTableSkeleton = () => {
  const columns = [
    { id: "orderId", width: columnWidth.orderId },
    { id: "orderedAt", width: columnWidth.orderedAt },
    { id: "fromAmount", width: columnWidth.fromAmount },
    { id: "appliedRate", width: columnWidth.appliedRate },
    { id: "toAmount", width: columnWidth.toAmount },
  ];

  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="w-full overflow-x-auto overflow-y-auto pt-4 pb-4 rounded-[16px] border border-border-gray-200 bg-white max-h-[552px]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column) => {
              const isRightAlign = TABLE_COLUMN_RIGHT_ALIGN_COLUMNS.includes(column.id);
              return (
                <th
                  key={column.id}
                  className={`px-6 h-[49px] border-t border-b border-border-gray-200 bg-white ${
                    isRightAlign ? "text-right" : "text-left"
                  } text-sm font-medium text-text-primary`}
                  style={{
                    minWidth: `${column.width}px`,
                  }}
                >
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="bg-white h-[49px] px-6"
                  style={{
                    minWidth: `${column.width}px`,
                  }}
                >
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTableSkeleton;
