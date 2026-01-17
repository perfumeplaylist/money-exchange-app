import { getWalletsApi } from "@/entities/wallet/api/wallet.api";

const wallets_query_key = {
  getWallets: ["wallets"],
};

const wallets_query_option = {
  getWallets: {
    queryKey: wallets_query_key.getWallets,
    queryFn: () => getWalletsApi(),
  },
};

export default wallets_query_option;
