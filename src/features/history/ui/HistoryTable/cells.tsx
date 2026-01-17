import { formatDateTime } from "@/shared";
import { Text } from "@packages/ui/components";

/**
 * 숫자에 천 단위 구분 기호 추가
 */
const formatNumber = (num: number): string => {
  return num.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * 환율 포맷팅 (소수점 2자리)
 */
const formatRate = (rate: number): string => {
  return rate.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

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
  const formatted = formatNumber(amount);
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
  const formatted = formatRate(value);
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
  const formatted = formatNumber(amount);
  return (
    <CellWrapper align="right">
      {formatted} {currency}
    </CellWrapper>
  );
};
