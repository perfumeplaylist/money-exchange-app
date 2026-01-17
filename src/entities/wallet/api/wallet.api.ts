import { httpClient } from "@/shared/utils/HttpClient";
import type { GetWalletsResponse } from "../model/types";


export const getWalletsApi = () => {
  return httpClient.get<GetWalletsResponse>("/wallets");
};
