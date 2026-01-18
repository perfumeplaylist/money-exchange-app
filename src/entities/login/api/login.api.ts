import type { LoginFormData } from "@/features/login";
import { httpClient } from "@/shared/utils/HttpClient";
import type { PostLoginResponse } from "../model/types";



export const loginApi = (data: LoginFormData) => {
  const url = "/auth/login";

  return httpClient.post<PostLoginResponse>(url, null, {
    params: { email: data.email },
  });
};
