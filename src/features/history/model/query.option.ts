import { getHistoryApi } from "@/entities/history/api/history.api";
import { queryOptions } from "@tanstack/react-query";

export const history_query_key = {
  getHistory: () => ["history"],
};

export const history_query_option = {
  getHistory:()=> queryOptions ({
    queryKey: history_query_key.getHistory(),
    queryFn: () => getHistoryApi(),
  }),
};

