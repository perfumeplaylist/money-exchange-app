import { EstimateQuoteForm, QuoteResult } from "@/features/exchange/estimate-quote";
import { Flex } from "@packages/ui";
import { ChevronDownIcon } from "lucide-react";
import { useEstimateKrw } from "@/features/exchange/estimate-krw";

interface EstimateFormAreaProps {
  estimate: ReturnType<typeof useEstimateKrw>;
}

const EstimateFormArea = ({ estimate }: EstimateFormAreaProps) => {
  return (
    <Flex direction="column" gap="lg" className="w-full">
      <EstimateQuoteForm />

      <div className="pointer-events-none w-9 h-9 rounded-full bg-[#ACB4BB] border border-border-default flex items-center justify-center mx-auto">
        <ChevronDownIcon className="w-5 h-5 text-white" />
      </div>

      <QuoteResult
        requiredKrw={estimate.requiredKrw}
        appliedRate={estimate.appliedRate}
        currency={estimate.currency}
        transactionType={estimate.transactionType}
        isQuoteLoading={estimate.isQuoteLoading}
        amount={estimate.amount}
      />
    </Flex>
  );
};

export default EstimateFormArea;
