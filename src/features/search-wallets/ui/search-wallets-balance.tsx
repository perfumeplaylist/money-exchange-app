import { Flex, Text } from "@packages/ui";
import formatCurrencyAmount from "@/entities/wallet/utils/format-currency-amount";
import type { Wallet } from "@/entities";


const SearchWalletsBalance = ({ wallets }: { wallets: Wallet[] }) => {

  return (
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
    </Flex>
  );
};

export default SearchWalletsBalance;