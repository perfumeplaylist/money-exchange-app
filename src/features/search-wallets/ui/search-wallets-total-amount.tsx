import { Flex, Text } from "@packages/ui"
import { formatCurrencyAmount } from "@/entities";
import type { GetWalletsResponse } from "@/entities";

type SearchWalletsTotalAmountProps = {
  totalKrwBalance: GetWalletsResponse['totalKrwBalance'];
}
const SearchWalletsTotalAmount = ({ totalKrwBalance }: SearchWalletsTotalAmountProps) => {

  return (
    <Flex direction="row" justify="between" align="center" className="w-full">
      <Text variant="wallet_label">총 보유 자산</Text>
      <Text variant="wallet_total_amount" align="right" color="accent">
        {formatCurrencyAmount("KRW", totalKrwBalance)}
      </Text>
    </Flex>
  );
};

export default SearchWalletsTotalAmount;