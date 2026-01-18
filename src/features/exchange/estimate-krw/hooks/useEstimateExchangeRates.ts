import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { estimate_quote_query_option } from "@/features/exchange/estimate-quote/model/query.option";
import type { ResponseExchangeRate } from "@/entities/exchange";
import type { CurrencyCode } from "@/shared";

const useEstimateExchangeRates = (currency: CurrencyCode) => {
  const { data: exchangeRates, refetch: refetchExchangeRates } = useSuspenseQuery({
    ...estimate_quote_query_option.getExchangeRatesLatest(),
    refetchInterval: 1000 * 60 * 1, // 1분마다 새로고침
    refetchIntervalInBackground: true,
  });

  // 선택된 통화의 환율 찾기
  const selectedExchangeRate = useMemo(() => {
    return exchangeRates.find(
      (rate: ResponseExchangeRate) => rate.currency === currency
    );
  }, [exchangeRates, currency]);

  const handleRefetchExchangeRates = async () => {
    const result = await refetchExchangeRates();
    return { data: result.data };
  };

  return {
    exchangeRates,
    selectedExchangeRate,
    refetchExchangeRates: handleRefetchExchangeRates,
  };
};

export default useEstimateExchangeRates;
