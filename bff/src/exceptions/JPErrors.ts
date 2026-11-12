import { InternalServerErrorException } from '@nestjs/common';

export class JPErrors {
  // 予期しないエラー
  static JP500_01(
    message?: string,
    details?: unknown,
  ): InternalServerErrorException {
    return new InternalServerErrorException({
      logLevel: 'ERROR',
      errorCode: 'JP500_01',
      message: message || '外部API通信で予期しないエラーが発生しました',
      details,
    });
  }
}
