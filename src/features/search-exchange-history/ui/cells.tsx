import { formatDateTime } from "@/shared";
import { Text } from "@packages/ui/components";
import { formatExchangeRate } from "@/entities/exchange";

/**
 * 공통 Cell 래퍼 스타일
 */
const CellWrapper = ({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) => {
  return (
    <div className="h-full flex items-center px-6">
      <Text variant="body_sm" align={align} className="w-full">
        {children}
      </Text>
    </div>
  );
};

/**
 * 거래 ID Cell
 */
export const OrderIdCell = ({ value }: { value: number }) => {
  return <CellWrapper>{value}</CellWrapper>;
};

/**
 * 거래 일시 Cell
 */
export const OrderedAtCell = ({ value }: { value: string }) => {
  const formatted = formatDateTime(value);
  return <CellWrapper>{formatted}</CellWrapper>;
};

/**
 * 매수 금액 Cell
 */
export const FromAmountCell = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const formatted = formatExchangeRate(amount);
  return (
    <CellWrapper align="right">
      {formatted} {currency}
    </CellWrapper>
  );
};

/**
 * 체결 환율 Cell
 */
export const AppliedRateCell = ({ value }: { value: number }) => {
  const formatted = formatExchangeRate(value);
  return <CellWrapper align="right">{formatted}</CellWrapper>;
};

/**
 * 매도 금액 Cell
 */
export const ToAmountCell = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const formatted = formatExchangeRate(amount);
  return (
    <CellWrapper align="right">
      {formatted} {currency}
    </CellWrapper>
  );
};
