import type { CurrencyCode } from "@/shared";

export type Wallet = {
  walletId: number;
  currency: CurrencyCode;
  balance: number;
};

export type GetWalletsResponse = {
  totalKrwBalance: number;
  wallets: Wallet[];
};