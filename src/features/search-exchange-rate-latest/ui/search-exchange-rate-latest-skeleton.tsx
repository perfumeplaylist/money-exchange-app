import { Box, Flex } from "@packages/ui";

const SearchExchangeRateLatestSkeleton = () => {
  return (
    <Box variant="small_card" className="flex-1 min-w-[340px]">
      <Flex direction="column" gap="sm">
        {/* 헤더 영역 스켈레톤 */}
        <Flex direction="row" justify="between" className="w-full">
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </Flex>

        {/* 환율 표시 영역 스켈레톤 */}
        <Flex direction="column" gap="xs">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <Flex direction="row" align="center" gap="xs">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchExchangeRateLatestSkeleton;
