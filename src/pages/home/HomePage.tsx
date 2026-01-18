import { PageHeader } from "@/shared";
import { ExchangeRateLatestWalletsBox, EstimateKrwSection } from "@/widgets";
import {
  Flex
} from "@packages/ui";




const HomePage = () => {

  return (
    <section className="w-full">
      <PageHeader
        title="환율 정보"
        description="실시간 환율을 확인하고 간편하게 환전하세요."
      />
      <Flex gap="lg" align="stretch">
        <ExchangeRateLatestWalletsBox />
        <EstimateKrwSection />
      </Flex>
    </section>
  );
};

export default HomePage;
