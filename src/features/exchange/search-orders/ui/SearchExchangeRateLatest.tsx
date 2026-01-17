import { Box, Flex, Text } from "@packages/ui";
import { Triangle } from "lucide-react";
import exchange_rates_query_option from "../model/query.option";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { CurrencyCode } from "@/shared";
import type { ResponseExchangeRate } from "@/entities/exchange";

interface SearchExchangeRateLatestProps {
  currency: CurrencyCode;
}


const SearchExchangeRateLatest = ({ currency }: SearchExchangeRateLatestProps) => {

  // 첫번째 배열은 일본,두번쨰 배열은 미국

  const { data: exchangeRates } = useSuspenseQuery({
    ...exchange_rates_query_option.getExchangeRatesLatest(),
    refetchInterval: 1000 * 60 * 1, // 1분마다 새로고침
    refetchIntervalInBackground: true,
    select: (data) => data.find((item: ResponseExchangeRate) => item.currency === currency)!,
  });

  // changePercentage가 양수면 상승, 음수면 하락
  const isIncrease = exchangeRates.changePercentage > 0;
  const isDecrease = exchangeRates.changePercentage < 0;

  // 변화율 포맷팅 (절댓값 사용)
  const formattedChangePercentage = `${isIncrease ? "+" : ""}${exchangeRates.changePercentage.toFixed(2)}%`;

  // 금액 포맷팅
  const formattedRate = exchangeRates.rate.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box variant="small_card" className="flex-1 min-w-[340px]">
      <Flex direction="column" gap="sm">
        <Flex direction="row" justify="between" className="w-full">
          <Text as="p" variant="unit_lg">
            {exchangeRates.currency}
          </Text>
          <Text as="p" variant="body_md" color="form_label">
            {currency === "USD" ? "미국 달러" : "일본 엔화"}
          </Text>
        </Flex>
        <Flex direction="column" gap="xs">
          <Text variant="rate_display">
            {formattedRate} KRW
          </Text>
          {(isIncrease || isDecrease) && (
            <Flex direction="row" align="center" gap="xs">
              {isIncrease ? (
                <Triangle
                  size={16}
                  className="text-increase"
                  fill="currentColor"
                />
              ) : (
                <Triangle
                  size={16}
                  className="text-decrease rotate-180"
                  fill="currentColor"
                />
              )}
              <Text
                variant="body_md"
                color={isIncrease ? "increase" : "decrease"}
              >
                {formattedChangePercentage}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchExchangeRateLatest;