import { type ColumnDef } from "@tanstack/react-table";
import type { GetOrdersResponse } from "@/entities/orders/model/types";
import {
  OrderIdCell,
  OrderedAtCell,
  FromAmountCell,
  AppliedRateCell,
  ToAmountCell,
} from "./cells";
import { columnWidth } from "@/features/search-exchange-history/model/column.width";

export const createColumns = (): ColumnDef<GetOrdersResponse>[] => {
  return [
    {
      id: "orderId",
      accessorKey: "orderId",
      header: "거래 ID",
      enableSorting: true,
      minSize: columnWidth.orderId,
      size: columnWidth.orderId,
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return <OrderIdCell value={value} />;
      },
    },
    {
      id: "orderedAt",
      accessorKey: "orderedAt",
      header: "거래 일시",
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.orderedAt).getTime();
        const dateB = new Date(rowB.original.orderedAt).getTime();
        return dateA - dateB;
      },
      minSize: columnWidth.orderedAt,
      size: columnWidth.orderedAt,
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <OrderedAtCell value={value} />;
      },
    },
    {
      id: "fromAmount",
      accessorKey: "fromAmount",
      header: "매수 금액",
      enableSorting: true,
      minSize: columnWidth.fromAmount,
      size: columnWidth.fromAmount,
      cell: ({ row }) => {
        const fromAmount = row.original.fromAmount;
        const fromCurrency = row.original.fromCurrency;
        return <FromAmountCell amount={fromAmount} currency={fromCurrency} />;
      },
    },
    {
      id: "appliedRate",
      accessorKey: "appliedRate",
      header: "체결 환율",
      enableSorting: true,
      minSize: columnWidth.appliedRate,
      size: columnWidth.appliedRate,
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return <AppliedRateCell value={value} />;
      },
    },
    {
      id: "toAmount",
      accessorKey: "toAmount",
      header: "매도 금액",
      enableSorting: true,
      minSize: columnWidth.toAmount,
      size: columnWidth.toAmount,
      cell: ({ row }) => (
        <ToAmountCell
          amount={row.original.toAmount}
          currency={row.original.toCurrency}
        />
      ),
    },
  ];
};
