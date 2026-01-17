import { httpClient } from "@/shared/utils/HttpClient";
import type { ExchangeRate } from "../model/types";

export const getExchangeRatesLatestApi = () => {
  const url = "/exchange-rates/latest";

  return httpClient.get<ExchangeRate[]>(url);
};