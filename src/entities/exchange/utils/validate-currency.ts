import type { CurrencyCode } from "@/shared";

/**
 * 환전 가능한 통화인지 검증
 * @param currency - 검증할 통화 코드
 * @returns USD 또는 JPY인 경우 true
 */
export const isValidExchangeCurrency = (currency: CurrencyCode): boolean => {
  return currency === "USD" || currency === "JPY";
};
