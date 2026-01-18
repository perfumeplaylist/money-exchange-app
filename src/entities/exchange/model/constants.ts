import { US, JP } from "country-flag-icons/react/3x2";
import type { CurrencyCode } from "@/shared";

export type CurrencyOption = {
  value: CurrencyCode;
  label: string;
  flagIcon: React.ComponentType<{ className?: string }>;
  countryName: string;
};

/**
 * 환전 가능한 통화 옵션 목록
 */
export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    value: "USD",
    label: "미국 USD",
    flagIcon: US,
    countryName: "미국",
  },
  {
    value: "JPY",
    label: "일본 JPY",
    flagIcon: JP,
    countryName: "일본",
  },
];

/**
 * 통화별 표시명 매핑
 */
export const CURRENCY_DISPLAY_NAMES: Record<CurrencyCode, string> = {
  USD: "달러",
  JPY: "엔",
  KRW: "원",
};

/**
 * 거래 유형별 표시 텍스트
 */
export const TRANSACTION_TYPE_DISPLAY: Record<"buy" | "sell", string> = {
  buy: "사기",
  sell: "팔기",
};
