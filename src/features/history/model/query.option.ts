import { getHistoryApi } from "@/entities/history/api/history.api";
import { queryOptions } from "@tanstack/react-query";

const history_query_key = {
  getHistory: () => ["history"],
};

const history_query_option = {
  getHistory:()=> queryOptions ({
    queryKey: history_query_key.getHistory(),
    queryFn: () => getHistoryApi(),
  }),
};

export default history_query_option;
