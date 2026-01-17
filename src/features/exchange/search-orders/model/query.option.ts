import { getExchangeRatesLatestApi } from "@/entities/exchange";
  
const exchange_rates_query_key = {
  getExchangeRatesLatest: ["exchange-rates-latest"],
};

const exchange_rates_query_option = {
  getExchangeRatesLatest: {
    queryKey: exchange_rates_query_key.getExchangeRatesLatest,
    queryFn: getExchangeRatesLatestApi,
  },
};

export default exchange_rates_query_option;