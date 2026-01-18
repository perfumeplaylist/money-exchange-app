import { EstimateKrwForm } from "@/features/exchange/estimate-krw";
import SearchExchangeRateLatest from "@/features/search-exchange-rate-latest/ui/search-exchange-rate-latest";
import SearchWalletsBox from "@/features/search-wallets/ui/search-wallets-box";
import { PageHeader } from "@/shared";
import {
  Flex
} from "@packages/ui";
import { Suspense } from "react";




const HomePage = () => {

  return (
    <section className="w-full">
      <PageHeader
        title="환율 정보"
        description="실시간 환율을 확인하고 간편하게 환전하세요."
      />
      <Flex gap="lg" align="stretch">
        <Flex direction="column" gap="lg">
          <Flex direction="column" gap="lg">
            <Flex direction="row" gap="lg">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchExchangeRateLatest currency="USD" />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <SearchExchangeRateLatest currency="JPY" />
              </Suspense>
            </Flex>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchWalletsBox />
            </Suspense>
          </Flex>
        </Flex>

        <section className="flex-1">
          <EstimateKrwForm />
        </section>

      </Flex>
    </section>
  );
};

export default HomePage;
