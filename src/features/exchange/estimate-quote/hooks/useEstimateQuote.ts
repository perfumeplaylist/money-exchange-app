import { useForm } from "react-hook-form";
import { estimateQuoteSchema, type EstimateQuoteFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { estimate_quote_query_option } from "../model/query.option";
import type { ResponseExchangeRate } from "@/entities/exchange";

// Debounce 훅
const useDebouncedValue = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useEstimateQuote = () => {

  const form = useForm<EstimateQuoteFormData>({
    resolver: zodResolver(estimateQuoteSchema),
    mode: "onChange",
    defaultValues: {
      currency: "USD",
      transactionType: "buy",
      amount: 0,
    },
  });

  const currency = form.watch("currency");
  const amount = form.watch("amount");

  // Debounced amount for API calls
  const debouncedAmount = useDebouncedValue(amount, 500);

  // 환율 데이터 조회
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

  // 견적 조회 (API 호출) - debounced amount 사용
  const { data: quoteData, isLoading: isQuoteLoading } = useQuery({
    ...estimate_quote_query_option.getExchangeRatesHistory({
      fromCurrency: currency,
      toCurrency: "KRW",
      forexAmount: debouncedAmount,
    }),
    enabled: debouncedAmount > 0 && !!selectedExchangeRate,
  });

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

  const handleRefetchExchangeRates = async () => {
    const result = await refetchExchangeRates();
    return { data: result.data };
  };

  return {
    form,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    refetchExchangeRates: handleRefetchExchangeRates,
  };
};

export default useEstimateQuote;
