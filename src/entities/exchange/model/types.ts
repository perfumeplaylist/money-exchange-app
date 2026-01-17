import type { CurrencyCode } from "@/shared";

export type ExchangeRate = {
  exchangeRateId: number;
  currency: CurrencyCode;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};