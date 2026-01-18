import type { CurrencyCode } from "@/shared";

export type GetOrdersResponse = {
  orderId: number;
  fromCurrency: CurrencyCode;
  fromAmount: number;
  toCurrency: CurrencyCode;
  toAmount: number;
  appliedRate: number;
  orderedAt: string;
};