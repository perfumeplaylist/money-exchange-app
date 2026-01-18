/**
 * 화폐별 금액 포맷팅 함수
 */

import type { CurrencyCode } from "@/shared";

const formatCurrencyAmount = (currency: CurrencyCode, amount: number): string => {
  const formattedAmount = amount.toLocaleString("ko-KR");

  switch (currency) {
    case "KRW":
      return `₩ ${formattedAmount}`;
    case "USD":
      return `$ ${formattedAmount}`;
    case "JPY":
      return `¥ ${formattedAmount}`;
    default:
      return formattedAmount;
  }
};


export default formatCurrencyAmount;