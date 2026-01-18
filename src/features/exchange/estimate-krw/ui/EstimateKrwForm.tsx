import { Box, Flex, Text, Form } from "@packages/ui";
import { Divider } from "@/shared";
import { ChevronDownIcon } from "lucide-react";
import { EstimateQuoteForm, QuoteResult, useEstimateQuote } from "@/features/exchange/estimate-quote";
import { CreateOrderButton } from "@/features/exchange/create-order";

const EstimateKrwForm = () => {
  const {
    form,
    selectedExchangeRate,
    requiredKrw,
    appliedRate,
    isQuoteLoading,
    refetchExchangeRates,
  } = useEstimateQuote();

  const currency = form.watch("currency");
  const transactionType = form.watch("transactionType");
  const amount = form.watch("amount");

  const handleOrderSuccess = () => {
    // amount 필드만 리셋
    form.resetField("amount", { defaultValue: 0 });
  };

  const handleOrderError = (error: Error) => {
    form.setError("root", { message: error.message });
  };

  return (

    <Box variant="form" className="w-full h-full border-border-wallet">
      <Form {...form}>
        <Flex direction="column" justify="between" className="w-full h-full">
          <Flex direction="column" gap="lg" className="w-full">
            <EstimateQuoteForm />

            <div className="pointer-events-none w-9 h-9 rounded-full bg-[#ACB4BB] border border-border-default flex items-center justify-center mx-auto">
              <ChevronDownIcon className="w-5 h-5 text-white" />
            </div>

            <QuoteResult
              requiredKrw={requiredKrw}
              appliedRate={appliedRate}
              currency={currency}
              transactionType={transactionType}
              isQuoteLoading={isQuoteLoading}
              amount={amount}
            />
          </Flex>

          <Flex direction="column" gap="lg" className="w-full">
            <Divider />

            {/* 에러 메시지 */}
            {form.formState.errors.root && (
              <Text variant="body_sm" color="error" className="text-center">
                {form.formState.errors.root.message}
              </Text>
            )}

            {/* 환전하기 버튼 */}
            <CreateOrderButton
              formData={{
                currency,
                transactionType,
                amount,
              }}
              selectedExchangeRate={selectedExchangeRate}
              refetchExchangeRates={refetchExchangeRates}
              isFormValid={form.formState.isValid}
              amount={amount}
              isQuoteLoading={isQuoteLoading}
              onSuccess={handleOrderSuccess}
              onError={handleOrderError}
            />
          </Flex>
        </Flex>
      </Form>
    </Box>
  );
};

export default EstimateKrwForm;
