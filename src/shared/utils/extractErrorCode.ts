import { ApiError } from '../errors/ApiError';
import type { ErrorCode } from '../errors/types';

/**
 * 에러 객체에서 code 속성을 안전하게 추출합니다.
 * ApiError 또는 DomainError 인스턴스의 code를 반환하고,
 * 일반 Error는 null을 반환합니다.
 */
export function extractErrorCode(error: unknown): ErrorCode | null {
  if (error instanceof ApiError) {
    return error.code;
  }
  return null;
}
