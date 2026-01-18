import SearchExchangeRateLatest from "@/features/search-exchange-rate-latest/ui/search-exchange-rate-latest";
import { SearchExchangeRateLatestSkeleton } from "@/features/search-exchange-rate-latest";
import SearchWalletsBox from "@/features/search-wallets/ui/search-wallets-box";
import { SearchWalletsBoxSkeleton } from "@/features/search-wallets";
import { SectionErrorBoundary, CurrencyError, WalletError } from "@/shared";
import { Flex } from "@packages/ui";
import { Suspense } from "react";

const ExchangeRateLatestWalletsBox = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="lg">
        <Flex direction="row" gap="lg">
          <SectionErrorBoundary errorType={CurrencyError}>
            <Suspense fallback={<SearchExchangeRateLatestSkeleton />}>
              <SearchExchangeRateLatest currency="USD" />
            </Suspense>
          </SectionErrorBoundary>
          <SectionErrorBoundary errorType={CurrencyError}>
            <Suspense fallback={<SearchExchangeRateLatestSkeleton />}>
              <SearchExchangeRateLatest currency="JPY" />
            </Suspense>
          </SectionErrorBoundary>
        </Flex>
        <SectionErrorBoundary errorType={WalletError}>
          <Suspense fallback={<SearchWalletsBoxSkeleton />}>
            <SearchWalletsBox />
          </Suspense>
        </SectionErrorBoundary>
      </Flex>
    </Flex>
  );
};

export default ExchangeRateLatestWalletsBox;