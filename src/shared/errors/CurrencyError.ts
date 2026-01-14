import { DomainError } from './DomainError';
import type { CurrencyErrorCode } from './types';

export class CurrencyError extends DomainError<CurrencyErrorCode> {
  constructor(
    code: CurrencyErrorCode,
    message: string,
    statusCode: number = 400
  ) {
    super(code, message, statusCode);
    this.name = 'CurrencyError';

    // Error 클래스의 프로토타입 체인 유지
    Object.setPrototypeOf(this, CurrencyError.prototype);
  }
}
