/**
 * API 응답 형식
 * 
 * 성공 응답: { code: "OK", message: string, data: T }
 * 에러 응답: { code: string, message: string, data: null }
 */
export interface HttpResponse<T = unknown> {
  code: string;
  message: string;
  data: T | null;
}

// ApiErrorResponse는 errors/types.ts에서 re-export
export type { ApiErrorResponse } from '../errors/types.js';
