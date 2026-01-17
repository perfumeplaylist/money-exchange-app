import { httpClient } from "@/shared/utils/HttpClient";

type Currency = "KRW" | "USD" | "JPY";

export type HistoryItem = {
  orderId: number;
  fromCurrency: Currency;
  fromAmount: number;
  toCurrency: Currency;
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
