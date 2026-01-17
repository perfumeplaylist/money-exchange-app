import { httpClient } from "@/shared/utils/HttpClient";
import type { ResponseExchangeRate, ExchangeRateHistory, ResponseExchangeRateHistory, PostExchangeRateHistory } from "../model/types";

export const getExchangeRatesLatestApi = () => {
  const url = "/exchange-rates/latest";

  return httpClient.get<ResponseExchangeRate[]>(url);
};


export const getExchangeRatesHistoryApi = (body: ExchangeRateHistory) => {
  const url = "/orders/quote";

  const params={
    fromCurrency: body.fromCurrency,
    toCurrency: body.toCurrency,
    forexAmount: body.forexAmount,
  };

  return httpClient.get<ResponseExchangeRateHistory>(url, { params });
};


export const postExchangeRateHistoryApi = (body: PostExchangeRateHistory) => {
  const url = "/orders";

  return httpClient.post(url, body);
};