import { Flex, Text } from "@packages/ui";
import { Triangle } from "lucide-react";

type ExchangeRateChangeProps = {
  formattedChangePercentage: string;
  isIncrease: boolean;
  isDecrease: boolean;
}

const ExchangeRateChange = ({
  formattedChangePercentage,
  isIncrease,
  isDecrease,
}: ExchangeRateChangeProps) => {
  return (
    <Flex direction="row" align="center" gap="xs">
      {isIncrease ? (
        <Triangle
          size={16}
          className="text-increase"
          fill="currentColor"
        />
      ) : isDecrease ? (
        <Triangle
          size={16}
          className="text-decrease rotate-180"
          fill="currentColor"
        />
      ) : null}
      <Text
        variant="body_md"
        color={isIncrease ? "increase" : isDecrease ? "decrease" : "form_label"}
      >
        {formattedChangePercentage}
      </Text>
    </Flex>
  );
};

export default ExchangeRateChange;
