import { getWalletsApi } from "@/entities/wallet/api/wallet.api";
import { queryOptions } from "@tanstack/react-query";

export const wallets_query_key = {
  getWallets: () => ["wallets"],
};

export const wallets_query_option = {
  getWallets:() => queryOptions({
    queryKey: wallets_query_key.getWallets(),
    queryFn: () => getWalletsApi(),
  }),
};

