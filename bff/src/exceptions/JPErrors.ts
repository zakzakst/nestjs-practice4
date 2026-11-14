import {
  ApiInternalServerErrorException,
  ApiBadGatewayException,
} from './ApiError.js';

export class JPErrors {
  // 予期しないエラー
  static JP500_01(details?: unknown): ApiInternalServerErrorException {
    return new ApiInternalServerErrorException({
      errorCode: 'JP500_01',
      message: '外部API通信で予期しないエラーが発生しました',
      details,
    });
  }

  // 通信応答エラー
  static JP502_01(details?: unknown): ApiBadGatewayException {
    return new ApiBadGatewayException({
      errorCode: 'JP502_01',
      message: '外部API通信で応答エラーが発生しました',
      details,
    });
  }
}
