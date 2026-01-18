import { useSuspenseQuery } from "@tanstack/react-query";
import { history_query_option } from "../model/query.option";
import type { GetOrdersResponse } from "@/entities/orders/model/types";

export const useExchangeHistory = () => {
  const { data: historyData } = useSuspenseQuery({
    ...history_query_option.getHistory(),
    refetchOnMount: "always",
  });

  return {
    historyData: historyData || ([] as GetOrdersResponse[]),
  };
};
