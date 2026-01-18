import { SearchExchangeRateLatest, SearchExchangeRateLatestSkeleton } from "@/features/search-exchange-rate-latest";
import { SearchWalletsBox, SearchWalletsBoxSkeleton } from "@/features/search-wallets";
import { SectionErrorBoundary, ApiError } from "@/shared";
import { Flex } from "@packages/ui";
import { Suspense } from "react";

const ExchangeRateLatestWalletsBox = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="lg">
        <Flex direction="row" gap="lg">
          <SectionErrorBoundary errorType={ApiError}>
            <Suspense fallback={<SearchExchangeRateLatestSkeleton />}>
              <SearchExchangeRateLatest currency="USD" />
            </Suspense>
          </SectionErrorBoundary>
          <SectionErrorBoundary errorType={ApiError}>
            <Suspense fallback={<SearchExchangeRateLatestSkeleton />}>
              <SearchExchangeRateLatest currency="JPY" />
            </Suspense>
          </SectionErrorBoundary>
        </Flex>
        <SectionErrorBoundary errorType={ApiError}>
          <Suspense fallback={<SearchWalletsBoxSkeleton />}>
            <SearchWalletsBox />
          </Suspense>
        </SectionErrorBoundary>
      </Flex>
    </Flex>
  );
};

export default ExchangeRateLatestWalletsBox;