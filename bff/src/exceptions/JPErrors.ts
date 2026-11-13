import { ApiError } from './ApiError.js';

export class JPErrors {
  // 予期しないエラー
  static JP500_01(details?: unknown): ApiError {
    return new ApiError('外部API通信で予期しないエラーが発生しました', {
      code: 'JP500_01',
      logLevel: 'ERROR',
      details,
    });
  }
}
