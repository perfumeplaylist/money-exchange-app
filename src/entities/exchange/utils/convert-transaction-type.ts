import type { CurrencyCode } from "@/shared";

/**
 * transactionType에 따른 fromCurrency/toCurrency 변환
 * @param transactionType - "buy" 또는 "sell"
 * @param currency - 선택된 통화 (USD 또는 JPY)
 * @returns fromCurrency와 toCurrency 객체
 */
export const convertTransactionType = (
  transactionType: "buy" | "sell",
  currency: CurrencyCode
): { fromCurrency: CurrencyCode; toCurrency: CurrencyCode } => {
  // 살래요 (buy): KRW로 USD를 사는 것 → fromCurrency: "KRW", toCurrency: "USD"
  // 팔래요 (sell): USD를 팔아서 KRW를 받는 것 → fromCurrency: "USD", toCurrency: "KRW"
  if (transactionType === "buy") {
    return {
      fromCurrency: "KRW",
      toCurrency: currency,
    };
  } else {
    return {
      fromCurrency: currency,
      toCurrency: "KRW",
    };
  }
};
