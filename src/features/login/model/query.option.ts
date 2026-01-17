import { mutationOptions } from "@tanstack/react-query";
import { loginApi } from "@/entities/login/api/login.api";

const login_query_key = {
  login: () => ["login"],
};

const login_query_option = {
  login: ()=>mutationOptions({
    mutationKey: login_query_key.login(),
    mutationFn: loginApi,
  }),
};

export default login_query_option;
