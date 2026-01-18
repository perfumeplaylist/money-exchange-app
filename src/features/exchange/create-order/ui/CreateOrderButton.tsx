import { Button } from "@packages/ui";
import useCreateOrder from "../hooks/useCreateOrder";
import type { EstimateQuoteFormData } from "@/features/exchange/estimate-quote/model/schema";
import type { ResponseExchangeRate } from "@/entities/exchange";

interface CreateOrderButtonProps {
  formData: EstimateQuoteFormData;
  selectedExchangeRate: ResponseExchangeRate | undefined;
  refetchExchangeRates: () => Promise<{ data: ResponseExchangeRate[] | undefined }>;
  isFormValid: boolean;
  amount: number;
  isQuoteLoading: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const CreateOrderButton = ({
  formData,
  selectedExchangeRate,
  refetchExchangeRates,
  isFormValid,
  amount,
  isQuoteLoading,
  onSuccess,
  onError,
}: CreateOrderButtonProps) => {
  const { createOrder, isOrderPending } = useCreateOrder({
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const handleSubmit = () => {
    createOrder(formData, selectedExchangeRate, refetchExchangeRates);
  };

  return (
    <Button
      type="button"
      variant="default"
      size="xl"
      className="w-full"
      disabled={
        !isFormValid ||
        amount <= 0 ||
        isOrderPending ||
        isQuoteLoading
      }
      onClick={handleSubmit}
    >
      {isOrderPending ? "처리 중..." : "환전하기"}
    </Button>
  );
};

export default CreateOrderButton;
