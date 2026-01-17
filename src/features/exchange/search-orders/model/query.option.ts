import { getExchangeRatesHistoryApi, getExchangeRatesLatestApi, postExchangeRateHistoryApi, type ExchangeRateHistory, type PostExchangeRateHistory } from "@/entities/exchange";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
  
const exchange_rates_query_key = {
  getExchangeRatesLatest: () => ["exchange-rates-latest"],
  getExchangeRatesHistory: (body: ExchangeRateHistory)=>["exchange-rates-history", body.fromCurrency, body.toCurrency, body.forexAmount],
  postExchangeRateHistory: () => ["exchange-rates-history"],
};

const exchange_rates_query_option = {
  getExchangeRatesLatest:() => queryOptions({
    queryKey: exchange_rates_query_key.getExchangeRatesLatest(),
    queryFn: getExchangeRatesLatestApi,
  }),
  getExchangeRatesHistory: (body: ExchangeRateHistory) => queryOptions({
    queryKey: exchange_rates_query_key.getExchangeRatesHistory(body),
    queryFn: () => getExchangeRatesHistoryApi(body),
  }),
  postExchangeRateHistory:()  => mutationOptions({
    mutationKey: exchange_rates_query_key.postExchangeRateHistory(),
    mutationFn: (body: PostExchangeRateHistory) => postExchangeRateHistoryApi(body),
  }),
};

export default exchange_rates_query_option;