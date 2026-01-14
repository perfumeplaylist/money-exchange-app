import { ApiError } from './ApiError';
import type { ErrorCode } from './types';

/**
 * 도메인별 에러의 기본 추상 클래스
 * ApiError를 상속하며, 도메인별 구체적인 에러 클래스의 베이스가 됩니다.
 * 
 * @template TCode - 도메인별 에러 코드 타입 (예: WalletErrorCode, CurrencyErrorCode)
 */
export abstract class DomainError<TCode extends ErrorCode = ErrorCode> extends ApiError {
  public readonly code: TCode;

  constructor(code: TCode, message: string, statusCode: number = 400) {
    super(code, message, statusCode);
    this.name = 'DomainError';
    this.code = code;

    // Error 클래스의 프로토타입 체인 유지
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
