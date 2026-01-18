import { Box, Flex } from "@packages/ui";
import type { CurrencyCode } from "@/shared";
import useSearchExchangeRateLatest from "../hooks/useSearchExchangeRateLatest";
import ExchangeRateHeader from "./ExchangeRateHeader";
import ExchangeRateDisplay from "./ExchangeRateDisplay";
import ExchangeRateChange from "./ExchangeRateChange";

type SearchExchangeRateLatestProps = {
  currency: CurrencyCode;
}

const SearchExchangeRateLatest = ({ currency }: SearchExchangeRateLatestProps) => {
  const {
    exchangeRates,
    formattedRate,
    formattedChangePercentage,
    isIncrease,
    isDecrease,
  } = useSearchExchangeRateLatest(currency);

  return (
    <Box variant="small_card" className="flex-1 min-w-[340px]">
      <Flex direction="column" gap="sm">
        <ExchangeRateHeader currency={currency} currencyCode={exchangeRates.currency} />
        <Flex direction="column" gap="xs">
          <ExchangeRateDisplay formattedRate={formattedRate} />
          <ExchangeRateChange
            formattedChangePercentage={formattedChangePercentage}
            isIncrease={isIncrease}
            isDecrease={isDecrease}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchExchangeRateLatest;