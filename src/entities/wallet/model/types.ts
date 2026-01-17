import type { CurrencyCode } from "@/shared";

export type GetWalletsResponse = {
  totalKrwBalance: number;
  wallets: {
    walletId: number;
    currency: CurrencyCode;
    balance: number;
  }[];
};