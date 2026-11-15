import {
  ApiNotFoundException,
  ApiInternalServerErrorException,
  ApiBadGatewayException,
} from './ApiError.js';

export class JPErrors {
  // 指定した投稿がない
  static JP404_01(details?: unknown): ApiNotFoundException {
    return new ApiNotFoundException({
      errorCode: 'JP404_01',
      message: '指定された投稿データが見つかりません',
      details,
    });
  }

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
