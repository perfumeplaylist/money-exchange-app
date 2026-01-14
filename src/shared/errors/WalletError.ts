import { DomainError } from './DomainError';
import type { WalletErrorCode } from './types';

export class WalletError extends DomainError<WalletErrorCode> {
  constructor(code: WalletErrorCode, message: string, statusCode: number = 400) {
    super(code, message, statusCode);
    this.name = 'WalletError';

    // Error 클래스의 프로토타입 체인 유지
    Object.setPrototypeOf(this, WalletError.prototype);
  }
}
