import { useForm } from "react-hook-form";
import { estimateKrwSchema, type EstimateKrwFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import exchange_rates_query_option from "@/features/exchange/search-orders/model/query.option";
import type { ResponseExchangeRate } from "@/entities/exchange";
import  { wallets_query_key } from "@/features/wallets/model/query.option";

const useEstimateKrwForm = () => {
  const form = useForm<EstimateKrwFormData>({
    resolver: zodResolver(estimateKrwSchema),
    mode: "onChange",
    defaultValues: {
      currency: "USD",
      transactionType: "buy",
      amount: 0,
    },
  });

  const queryClient = useQueryClient();

  const currency = form.watch("currency");
  const amount = form.watch("amount");

  // 환율 데이터 조회
  const { data: exchangeRates,refetch: refetchExchangeRates } = useSuspenseQuery({
    ...exchange_rates_query_option.getExchangeRatesLatest(),
    refetchInterval: 1000 * 60 * 1, // 1분마다 새로고침
    refetchIntervalInBackground: true,
  });

  // 선택된 통화의 환율 찾기
  const selectedExchangeRate = useMemo(() => {
    return exchangeRates.find(
      (rate: ResponseExchangeRate) => rate.currency === currency
    );
  }, [exchangeRates, currency]);

  // 견적 조회 (API 호출)
  const { data: quoteData, isLoading: isQuoteLoading } = useQuery({
    ...exchange_rates_query_option.getExchangeRatesHistory({
      fromCurrency: currency,
      toCurrency: "KRW",
      forexAmount: amount,
    }),
    enabled: amount > 0 && !!selectedExchangeRate,
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

  // 환전 주문 mutation
  const { mutate: createOrder, isPending: isOrderPending } = useMutation({
    ...exchange_rates_query_option.postExchangeRateHistory(),
  });

  const onSubmit = async (data: EstimateKrwFormData) => {
    if (!selectedExchangeRate) {
      form.setError("currency", { message: "환율 정보를 불러올 수 없습니다." });
      return;
    }

    try {
      // 최신 환율 정보 refetch
      const { data: refetchedRates } = await refetchExchangeRates();
      
      // refetch된 데이터에서 현재 통화의 최신 환율 찾기
      const latestExchangeRate = refetchedRates?.find(
        (rate: ResponseExchangeRate) => rate.currency === data.currency
      );

      if (!latestExchangeRate) {
        form.setError("currency", { message: "최신 환율 정보를 불러올 수 없습니다." });
        return;
      }

      // transactionType에 따라 fromCurrency와 toCurrency 결정
      // 살래요 (buy): KRW로 USD를 사는 것 → fromCurrency: "KRW", toCurrency: "USD"
      // 팔래요 (sell): USD를 팔아서 KRW를 받는 것 → fromCurrency: "USD", toCurrency: "KRW"
      const fromCurrency = data.transactionType === "buy" ? "KRW" : data.currency;
      const toCurrency = data.transactionType === "buy" ? data.currency : "KRW";
      const forexAmount = data.amount;

      // 최신 exchangeRateId로 주문 생성
      createOrder(
        {
          exchangeRateId: latestExchangeRate.exchangeRateId,
          fromCurrency,
          toCurrency,
          forexAmount,
        },
        {
          onSuccess: () => {
            // 성공 처리
            console.log("환전 주문 성공");
            // TODO: 성공 메시지 표시 또는 페이지 이동
            queryClient.invalidateQueries({
              queryKey: wallets_query_key.getWallets(),
            });
            queryClient.invalidateQueries({
              queryKey: exchange_rates_query_option.getExchangeRatesLatest().queryKey,
            });
            form.reset();
          },
          onError: (error) => {
            // 에러 처리
            const errorMessage =
              error instanceof Error ? error.message : "환전 주문에 실패했습니다.";
            form.setError("root", { message: errorMessage });
            console.error("환전 주문 실패:", error);
          },
        }
      );
    } catch (error) {
      // refetch 실패 시 에러 처리
      const errorMessage =
        error instanceof Error ? error.message : "환율 정보를 불러오는데 실패했습니다.";
      form.setError("root", { message: errorMessage });
      console.error("환율 정보 refetch 실패:", error);
    }
  };

  return {
    form,
    onSubmit,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    isOrderPending,
  };
};

export default useEstimateKrwForm;
