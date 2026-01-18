import { queryOptions } from "@tanstack/react-query";
import { getExchangeRatesHistoryApi, getExchangeRatesLatestApi } from "@/entities/exchange";
import type { ExchangeRateHistory } from "@/entities/exchange";

export const estimate_quote_query_key = {
  getExchangeRatesLatest: () => ["exchange-rates-latest"],
  getExchangeRatesHistory: (body: ExchangeRateHistory) => ["exchange-rates-history", body.fromCurrency, body.toCurrency, body.forexAmount],
};

export const estimate_quote_query_option = {
  getExchangeRatesLatest: () => queryOptions({
    queryKey: estimate_quote_query_key.getExchangeRatesLatest(),
    queryFn: getExchangeRatesLatestApi,
  }),
  getExchangeRatesHistory: (body: ExchangeRateHistory) => queryOptions({
    queryKey: estimate_quote_query_key.getExchangeRatesHistory(body),
    queryFn: () => getExchangeRatesHistoryApi(body),
  }),
};
