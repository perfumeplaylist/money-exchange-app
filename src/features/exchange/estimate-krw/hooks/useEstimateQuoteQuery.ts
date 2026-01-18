import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/shared";
import { estimate_quote_query_option } from "@/features/exchange/estimate-quote/model/query.option";
import type { ResponseExchangeRate } from "@/entities/exchange";
import type { CurrencyCode } from "@/shared";
import type { UseFormReturn } from "react-hook-form";
import type { EstimateQuoteFormData } from "@/features/exchange/estimate-quote/model/schema";

type UseEstimateQuoteQueryParams = {
  currency: CurrencyCode;
  amount: number;
  selectedExchangeRate: ResponseExchangeRate | undefined;
  form: UseFormReturn<EstimateQuoteFormData>;
}

const useEstimateQuoteQuery = ({
  currency,
  amount,
  selectedExchangeRate,
  form,
}: UseEstimateQuoteQueryParams) => {
  // Debounced amount for API calls
  const debouncedAmount = useDebouncedValue(amount, 500);

  // 견적 조회 (API 호출) - debounced amount 사용
  const { data: quoteData, isLoading: isQuoteLoading, error: quoteError } = useQuery({
    ...estimate_quote_query_option.getExchangeRatesHistory({
      fromCurrency: currency,
      toCurrency: "KRW",
      forexAmount: debouncedAmount,
    }),
    throwOnError: false,
    enabled: debouncedAmount > 0 && !!selectedExchangeRate,
  });

  // 에러 발생 시 form에 에러 메시지 설정
  useEffect(() => {
    if (quoteError) {
      const errorMessage = quoteError.message
        ? quoteError.message
        : "견적 조회 중 오류가 발생했습니다.";
      form.setError("root", { message: errorMessage });
    }
  }, [quoteError, form]);

  // 필요 원화 (API로부터 받은 데이터 사용)
  const requiredKrw = useMemo(() => {
    if (!quoteData) {
      return 0;
    }
    return quoteData.krwAmount;
  }, [quoteData]);

  // 적용 환율 (API로부터 받은 데이터 사용)
  const appliedRate = useMemo(() => {
    if (!quoteData) {
      return selectedExchangeRate?.rate ?? 0;
    }
    return quoteData.appliedRate;
  }, [quoteData, selectedExchangeRate]);

  return {
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    quoteError
  };
};

export default useEstimateQuoteQuery;
