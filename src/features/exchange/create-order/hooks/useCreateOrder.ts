import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_order_mutation_option } from "../model/mutation.option";
import { estimate_quote_query_key } from "@/features/exchange/estimate-quote/model/query.option";
import { wallets_query_key } from "@/features/search-wallets/model/query.option";
import type { PostExchangeRateHistory, ResponseExchangeRate } from "@/entities/exchange";
import { convertTransactionType } from "@/entities/exchange";
import type { EstimateQuoteFormData } from "@/features/exchange/estimate-quote/model/schema";

interface UseCreateOrderProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const useCreateOrder = ({ onSuccess, onError }: UseCreateOrderProps = {}) => {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending: isOrderPending } = useMutation({
    ...create_order_mutation_option.createOrder(),
  });

  const handleCreateOrder = async (
    formData: EstimateQuoteFormData,
    selectedExchangeRate: ResponseExchangeRate | undefined,
    refetchExchangeRates: () => Promise<{ data: ResponseExchangeRate[] | undefined }>
  ) => {
    if (!selectedExchangeRate) {
      throw new Error("환율 정보를 불러올 수 없습니다.");
    }

    try {
      // 최신 환율 정보 refetch
      const { data: refetchedRates } = await refetchExchangeRates();

      // refetch된 데이터에서 현재 통화의 최신 환율 찾기
      const latestExchangeRate = refetchedRates?.find(
        (rate: ResponseExchangeRate) => rate.currency === formData.currency
      );

      if (!latestExchangeRate) {
        throw new Error("최신 환율 정보를 불러올 수 없습니다.");
      }

      // transactionType에 따라 fromCurrency와 toCurrency 결정
      const { fromCurrency, toCurrency } = convertTransactionType(
        formData.transactionType,
        formData.currency
      );

      const orderData: PostExchangeRateHistory = {
        exchangeRateId: latestExchangeRate.exchangeRateId,
        fromCurrency,
        toCurrency,
        forexAmount: formData.amount,
      };

      createOrder(orderData, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: wallets_query_key.getWallets(),
          });
          queryClient.invalidateQueries({
            queryKey: estimate_quote_query_key.getExchangeRatesLatest(),
          });
          onSuccess?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "환전 주문에 실패했습니다.";
          onError?.(new Error(errorMessage));
        },
      });
    } catch (error) {
      // refetch 실패 시 에러 처리
      const errorMessage =
        error instanceof Error ? error.message : "환율 정보를 불러오는데 실패했습니다.";
      onError?.(new Error(errorMessage));
    }
  };

  return {
    createOrder: handleCreateOrder,
    isOrderPending,
  };
};

export default useCreateOrder;
