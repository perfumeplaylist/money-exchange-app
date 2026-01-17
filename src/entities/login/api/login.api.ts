import type { LoginFormData } from "@/features/login";
import { httpClient } from "@/shared/utils/HttpClient";

type LoginResponse = {
  memberId: number;
  token: string;
};

export const loginApi = (data: LoginFormData) => {
  const url = "/auth/login";

  return httpClient.post<LoginResponse>(url, null, {
    params: { email: data.email },
  });
};
