import type { LoginFormData } from "@/features/login";
import type { HttpResponse } from "@/shared/utils";
import { httpClient } from "@/shared/utils/HttpClient";

type LoginResponse = {
  memberId: number;
  token: string;
};

export const loginApi = (data: LoginFormData) => {
  const url = "/auth/login";

  return httpClient.post<HttpResponse<LoginResponse>>(url, null, {
    params: { email: data.email },
  });
};
