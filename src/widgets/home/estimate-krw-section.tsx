import { useEstimateKrw } from "@/features/exchange/estimate-krw";
import { Box, Flex, Form } from "@packages/ui";
import EstimateFormArea from "./estimate-form-area";
import EstimateActionArea from "./estimate-action-area";
import { SectionErrorBoundary, WalletError } from "@/shared";

const EstimateKrwSection = () => {
  const estimate = useEstimateKrw();

  return (
    <SectionErrorBoundary errorType={WalletError}>
      <section className="flex-1">
        <Box variant="form" className="w-full h-full border-border-wallet">
          <Form {...estimate.form}>
            <Flex direction="column" justify="between" className="w-full h-full">
              <EstimateFormArea estimate={estimate} />
              <EstimateActionArea estimate={estimate} />
            </Flex>
          </Form>
        </Box>
      </section>
    </SectionErrorBoundary>
  );
};

export default EstimateKrwSection;
