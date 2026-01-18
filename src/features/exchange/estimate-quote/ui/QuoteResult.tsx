import { Flex, Text, Box } from "@packages/ui";
import { formatAmountDisplay, formatExchangeRate } from "@/entities/exchange";
import type { CurrencyCode } from "@/shared";

interface QuoteResultProps {
  requiredKrw: number;
  appliedRate: number;
  currency: CurrencyCode;
  transactionType: "buy" | "sell";
  isQuoteLoading: boolean;
  amount: number;
}

const QuoteResult = ({
  requiredKrw,
  appliedRate,
  currency,
  transactionType,
  isQuoteLoading,
  amount,
}: QuoteResultProps) => {
  const formattedRequiredKrw = formatAmountDisplay(requiredKrw, {
    maxFractionDigits: 0,
    minFractionDigits: 0,
    emptyIfZero: false,
  });
  const formattedRate = appliedRate > 0 ? formatExchangeRate(appliedRate) : "0.00";
  const resultText = transactionType === "buy" ? "원 필요해요" : "원 받을 수 있어요";

  return (
    <>
      {/* 필요 원화 표시 */}
      <Flex direction="column" gap="md" className="w-full">
        <Text variant="label" color="form_label">
          필요 원화
        </Text>
        <Box
          variant="container"
          className="w-full h-[75px] bg-[#F1F2F4] border border-border-default rounded-radius-sm flex items-center justify-end pr-4"
        >
          {isQuoteLoading && amount > 0 ? (
            <Text variant="body_md" className="text-text-secondary">
              계산 중...
            </Text>
          ) : (
            <div>
              <span className="text-text-primary">{formattedRequiredKrw}</span>{" "}
              <span className="text-primary">{resultText}</span>
            </div>
          )}
        </Box>
      </Flex>

      {/* 적용 환율 표시 */}
      {appliedRate > 0 && amount > 0 && (
        <Flex justify="between" align="center" className="w-full">
          <Text variant="wallet_label" color="form_label">
            적용 환율
          </Text>
          {isQuoteLoading ? (
            <Text variant="wallet_amount" as="p" className="text-text-secondary">
              계산 중...
            </Text>
          ) : (
            <Text variant="wallet_amount" as="p">
              1 {currency} = {formattedRate} 원
            </Text>
          )}
        </Flex>
      )}
    </>
  );
};

export default QuoteResult;
