import { httpClient } from "@/shared/utils/HttpClient";

type GetWalletsResponse = {
  totalKrwBalance: number;
  wallets: {
    walletId: number;
    currency: string;
    balance: number;
  }[];
};

export const getWalletsApi = () => {
  return httpClient.get<GetWalletsResponse>("/wallets");
};
