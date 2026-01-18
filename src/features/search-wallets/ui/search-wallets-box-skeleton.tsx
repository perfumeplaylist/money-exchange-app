import { Box, Flex } from "@packages/ui";
import { Divider } from "@/shared";

const SearchWalletsBoxSkeleton = () => {
  return (
    <Box variant="wallet" className="w-full min-h-[620px]">
      <Flex direction="column" gap="md" className="w-full h-full">
        {/* 제목 스켈레톤 */}
        <div className="h-7 w-20 bg-gray-200 rounded animate-pulse" />

        {/* 화폐별 잔액 스켈레톤 */}
        <Flex direction="column" gap="md" justify="between" className="w-full h-full">
          <Flex direction="column" gap="md" className="w-full">
            {[1, 2, 3].map((item) => (
              <Flex
                key={item}
                direction="row"
                justify="between"
                align="center"
                className="w-full"
              >
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex direction="column" gap="md" className="w-full">
          {/* 구분선 */}
          <Divider />

          {/* 총 보유 자산 스켈레톤 */}
          <Flex direction="row" justify="between" align="center" className="w-full">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchWalletsBoxSkeleton;
