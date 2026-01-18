import useEstimateKrwForm from "./useEstimateKrwForm";
import useEstimateExchangeRates from "./useEstimateExchangeRates";
import useEstimateQuoteQuery from "./useEstimateQuoteQuery";

const useEstimateKrw = () => {
  const { form, currency, transactionType, amount } = useEstimateKrwForm();

  const { selectedExchangeRate, refetchExchangeRates } = useEstimateExchangeRates(currency);

  const { requiredKrw, appliedRate, isQuoteLoading, quoteError } = useEstimateQuoteQuery({
    currency,
    amount,
    selectedExchangeRate,
    form,
  });

  const resetAmount = () => {
    form.resetField("amount", { defaultValue: 0 });
  };

  const setRootError = (message: string) => {
    form.setError("root", { message });
  };

  const handleOrderError = () => {
    form.setError("root", { message: quoteError?.message });
  };

  return {
    form,
    currency,
    transactionType,
    amount,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    resetAmount,
    setRootError,
    handleOrderError,
    refetchExchangeRates,
  };
};

export default useEstimateKrw;
