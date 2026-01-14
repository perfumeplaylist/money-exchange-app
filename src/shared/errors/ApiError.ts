import type { ErrorCode } from './types';

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(code: ErrorCode, message: string, statusCode: number = 400) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;

    // Error 클래스의 프로토타입 체인 유지
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
