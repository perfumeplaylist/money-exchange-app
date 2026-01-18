import { useSuspenseQuery } from "@tanstack/react-query";
import { exchange_rates_query_option } from "../model/query.option";
import { formatExchangeRate, formatChangePercentage } from "@/entities/exchange";
import type { CurrencyCode } from "@/shared";
import type { ResponseExchangeRate } from "@/entities/exchange";

const useSearchExchangeRateLatest = (currency: CurrencyCode) => {
  const { data: exchangeRates } = useSuspenseQuery({
    ...exchange_rates_query_option.getExchangeRatesLatest(),
    refetchInterval: 1000 * 60 * 1, // 1분마다 새로고침
    refetchIntervalInBackground: true,
    select: (data) => data.find((item: ResponseExchangeRate) => item.currency === currency)!,
  });

  // entities의 포맷팅 함수 사용
  const formattedRate = formatExchangeRate(exchangeRates.rate);
  const formattedChangePercentage = formatChangePercentage(exchangeRates.changePercentage);
  const isIncrease = exchangeRates.changePercentage > 0;
  const isDecrease = exchangeRates.changePercentage < 0;

  return {
    exchangeRates,
    formattedRate,
    formattedChangePercentage,
    isIncrease,
    isDecrease,
  };
};

export default useSearchExchangeRateLatest;
