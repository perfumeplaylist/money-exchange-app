import {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

import {
  storage_key,
  getLocalStorage,
  removeLocalStorage,
  type HttpResponse,
  type ApiErrorResponse,
  AxiosClient,
  toDomainError,
} from "@/shared";
/**
 * HttpClient
 * AxiosClient를 상속하며 기본 인터셉터를 제공합니다.
 * 에러는 자동으로 toDomainError를 통해 변환되어 throw됩니다.
 */
export class HttpClient extends AxiosClient {
  constructor(config: AxiosRequestConfig) {
    super(config);

    // 기본 인터셉터 설정
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  /**
   * 요청 인터셉터 설정
   * Content-Type 기본값 설정
   */
  protected setRequestInterceptors() {
    this.getTestInstance().interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Content-Type이 없으면 기본값 설정
        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json";
        }

        const token = getLocalStorage(storage_key.auth_token);

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 응답 인터셉터 설정
   * 성공 응답은 data 필드만 반환하고, 에러는 toDomainError로 변환하여 throw
   */
  protected setResponseInterceptors() {
    this.getTestInstance().interceptors.response.use(
      (response) => {
        // 성공 응답: data 필드만 추출하여 response.data에 할당
        const httpResponse = response.data as HttpResponse<unknown>;
        response.data = httpResponse.data;
        return response; // response 객체 전체를 반환해야 함
      },
      async (error: AxiosError<HttpResponse<unknown>>) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error);
        }

        // 에러 응답 처리
        const errorResponse = error.response?.data;

        if (errorResponse && this.isApiErrorResponse(errorResponse)) {
          // API 에러 응답 형식인 경우 toDomainError로 변환
          const statusCode = error.response?.status ?? 400;
          const domainError = toDomainError(
            errorResponse as ApiErrorResponse,
            statusCode
          );

          if (domainError.code === "UNAUTHORIZED") {
            // 토큰이 없으면 토큰 제거하고 로그인 페이지로 리다이렉션
            removeLocalStorage(storage_key.auth_token);
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }

          return Promise.reject(domainError);
        }

        // 그 외 에러는 그대로 reject
        return Promise.reject(error);
      }
    );
  }

  /**
   * API 에러 응답 형식인지 확인
   */
  private isApiErrorResponse(data: unknown): data is ApiErrorResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "code" in data &&
      "message" in data &&
      typeof (data as { code: unknown }).code === "string" &&
      typeof (data as { message: unknown }).message === "string"
    );
  }
}

const baseURL = import.meta.env.DEV
  ? "/api" // 개발: Vite proxy 사용
  : import.meta.env.VITE_BASE_ENDPOINT; // 프로덕션: 실제 API URL

export const httpClient = new HttpClient({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
