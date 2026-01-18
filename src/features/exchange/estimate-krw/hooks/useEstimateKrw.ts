import useEstimateKrwForm from "./useEstimateKrwForm";
import useEstimateExchangeRates from "./useEstimateExchangeRates";
import useEstimateQuoteQuery from "./useEstimateQuoteQuery";
import { useEffect } from "react";

const useEstimateKrw = () => {
  const { form, currency, transactionType, amount } = useEstimateKrwForm();

  const { selectedExchangeRate, refetchExchangeRates } = useEstimateExchangeRates(currency);

  const { requiredKrw, appliedRate, isQuoteLoading, quoteError } = useEstimateQuoteQuery({
    currency,
    amount,
    selectedExchangeRate,
  });



  const handleOrderError = () => {
    form.setError("root", { message: quoteError?.message });
  };

  // 에러 발생 시 form에 에러 메시지 설정
  useEffect(() => {
    if (quoteError) {
      const errorMessage = quoteError.message
        ? quoteError.message
        : "견적 조회 중 오류가 발생했습니다.";
      form.setError("root", { message: errorMessage });
    } else {
      // 에러가 해결되면 root 에러 제거
      form.clearErrors("root");
    }
  }, [quoteError, form]);

  // 입력값이 변경되면 에러 메시지 제거
  useEffect(() => {
    if (amount > 0 && !quoteError) {
      form.clearErrors("root");
    }
  }, [amount, quoteError, form]);

  return {
    form,
    currency,
    transactionType,
    amount,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    handleOrderError,
    refetchExchangeRates,
  };
};

export default useEstimateKrw;
