import { Flex, Text } from "@packages/ui";
import type { CurrencyCode } from "@/shared";

interface ExchangeRateHeaderProps {
  currency: CurrencyCode;
  currencyCode: CurrencyCode;
}

const ExchangeRateHeader = ({ currency, currencyCode }: ExchangeRateHeaderProps) => {
  const currencyName = currency === "USD" ? "미국 달러" : "일본 엔화";

  return (
    <Flex direction="row" justify="between" className="w-full">
      <Text as="p" variant="unit_lg">
        {currencyCode}
      </Text>
      <Text as="p" variant="body_md" color="form_label">
        {currencyName}
      </Text>
    </Flex>
  );
};

export default ExchangeRateHeader;
