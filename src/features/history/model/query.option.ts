import { getHistoryApi } from "@/entities/history/api/history.api";

const history_query_key = {
  getHistory: ["history"],
};

const history_query_option = {
  getHistory: {
    queryKey: history_query_key.getHistory,
    queryFn: () => getHistoryApi(),
  },
};

export default history_query_option;
