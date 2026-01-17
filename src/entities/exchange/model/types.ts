import type { CurrencyCode } from "@/shared";

export type ResponseExchangeRate = {
  exchangeRateId: number;
  currency: CurrencyCode;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};

export type ExchangeRateHistory = {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  forexAmount: number;
};

export type ResponseExchangeRateHistory = {
  krwAmount: number;
  appliedRate: number;
};


export type PostExchangeRateHistory = {
  exchangeRateId: number;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  forexAmount: number;
};