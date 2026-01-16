import type { LoginFormData } from "@/features/login";
import { httpClient } from "@/shared/utils/HttpClient";

export const loginApi = (data: LoginFormData) => {
  const url = "/auth/login";

  return httpClient.post(url, null, { params: { email: data.email } });
};
