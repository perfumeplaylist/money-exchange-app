import { httpClient } from "@/shared/utils/HttpClient";
import type { GetOrdersResponse } from "../model/types";



export const getOrdersApi = () => {
  const url = "/ordersㅁ";

  return httpClient.get<GetOrdersResponse[]>(url);
};
