import { CreateOrderButton } from "@/features/exchange/create-order";
import { Divider } from "@/shared";
import { Flex, Text } from "@packages/ui";
import { useEstimateKrw } from "@/features/exchange/estimate-krw";

type EstimateActionAreaProps = {
  estimate: ReturnType<typeof useEstimateKrw>;
}

const EstimateActionArea = ({ estimate }: EstimateActionAreaProps) => {
  const handleOrderSuccess = () => {
    estimate.form.resetField("amount", { defaultValue: 0 });
  };

  const handleOrderError = (error: Error) => {
    estimate.form.setError("root", { message: error.message });
  };

  return (
    <Flex direction="column" gap="lg" className="w-full">
      <Divider />

      {/* 에러 메시지 */}
      {estimate.form.formState.errors.root && (
        <Text variant="body_sm" color="error" className="text-center">
          {estimate.form.formState.errors.root.message}
        </Text>
      )}

      {/* 환전하기 버튼 */}
      <CreateOrderButton
        formData={{
          currency: estimate.currency,
          transactionType: estimate.transactionType,
          amount: estimate.amount,
        }}
        selectedExchangeRate={estimate.selectedExchangeRate}
        refetchExchangeRates={estimate.refetchExchangeRates}
        isFormValid={estimate.form.formState.isValid}
        amount={estimate.amount}
        isQuoteLoading={estimate.isQuoteLoading}
        onSuccess={handleOrderSuccess}
        onError={handleOrderError}
      />
    </Flex>
  );
};

export default EstimateActionArea;
