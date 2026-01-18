import { Text } from "@packages/ui";

interface ExchangeRateDisplayProps {
  formattedRate: string;
}

const ExchangeRateDisplay = ({ formattedRate }: ExchangeRateDisplayProps) => {
  return (
    <Text variant="rate_display">
      {formattedRate} KRW
    </Text>
  );
};

export default ExchangeRateDisplay;
