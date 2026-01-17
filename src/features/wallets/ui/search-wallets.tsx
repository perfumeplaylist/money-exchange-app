import { Box, Flex, Text } from "@packages/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wallets_query_option } from "../model/query.option";
import { Divider, type CurrencyCode } from "@/shared";

/**
 * 화폐별 금액 포맷팅 함수
 */
const formatCurrencyAmount = (currency: CurrencyCode, amount: number): string => {
  const formattedAmount = amount.toLocaleString("ko-KR");

  switch (currency) {
    case "KRW":
      return `₩ ${formattedAmount}`;
    case "USD":
      return `$ ${formattedAmount}`;
    case "JPY":
      return `¥ ${formattedAmount}`;
    default:
      return formattedAmount;
  }
};

const SearchWallets = () => {
  const { data } = useSuspenseQuery({
    ...wallets_query_option.getWallets()
  });

  const { wallets, totalKrwBalance } = data;

  return (
    <Box variant="wallet" className="w-full min-h-[620px]">
      <Flex direction="column" gap="md" className="w-full h-full">
        {/* 제목 */}
        <Text variant="wallet_title">내 지갑</Text>

        {/* 화폐별 잔액 */}
        <Flex direction="column" gap="md" justify="between" className="w-full h-full">
          <Flex direction="column" gap="md" className="w-full">
            {wallets.map((wallet) => (
              <Flex key={wallet.walletId} direction="row" justify="between" align="center" className="w-full">
                <Text variant="wallet_label" color="form_label">{wallet.currency}</Text>
                <Text variant="wallet_amount" align="right" color="form_label">
                  {formatCurrencyAmount(wallet.currency, wallet.balance)}
                </Text>
              </Flex>
            ))}
          </Flex>


          <Flex direction="column" gap="md" className="w-full">
            {/* 구분선 */}
            <Divider />

            {/* 총 보유 자산 */}
            <Flex direction="row" justify="between" align="center" className="w-full">
              <Text variant="wallet_label">총 보유 자산</Text>
              <Text variant="wallet_total_amount" align="right" color="accent">
                {formatCurrencyAmount("KRW", totalKrwBalance)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchWallets;