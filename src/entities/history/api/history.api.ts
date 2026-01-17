import type { CurrencyCode } from "@/shared";
import { httpClient } from "@/shared/utils/HttpClient";


export type HistoryItem = {
  orderId: number;
  fromCurrency: CurrencyCode;
  fromAmount: number;
  toCurrency: CurrencyCode;
  toAmount: number;
  appliedRate: number;
  orderedAt: string;
};

type GetHistoryResponse = {
  data: HistoryItem[];
};

export const getHistoryApi = () => {
  const url = "/orders";

  return httpClient.get<GetHistoryResponse>(url);
};
