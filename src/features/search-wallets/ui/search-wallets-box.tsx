import { Box, Flex, Text } from "@packages/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wallets_query_option } from "../model/query.option";
import { Divider } from "@/shared";
import SearchWalletsTotalAmount from "./search-wallets-total-amount";
import SearchWalletsBalance from "./search-wallets-balance";



const SearchWalletsBox = () => {
  const { data } = useSuspenseQuery({
    ...wallets_query_option.getWallets(),
    select: (data) => {
      return {
        wallets: data.wallets,
        totalKrwBalance: data.totalKrwBalance,
      }
    }
  });


  return (
    <Box variant="wallet" className="w-full min-h-[620px]">
      <Flex direction="column" gap="md" className="w-full h-full">
        {/* 제목 */}
        <Text variant="wallet_title" as="h2">내 지갑</Text>

        {/* 화폐별 잔액 */}
        <SearchWalletsBalance wallets={data.wallets} />


        <Flex direction="column" gap="md" className="w-full">
          {/* 구분선 */}
          <Divider />

          {/* 총 보유 자산 */}
          <SearchWalletsTotalAmount totalKrwBalance={data.totalKrwBalance} />
        </Flex>
      </Flex>
    </Box >
  );
};

export default SearchWalletsBox;