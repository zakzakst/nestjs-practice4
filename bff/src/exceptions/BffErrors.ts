import {
  ApiBadRequestException,
  ApiInternalServerErrorException,
  ApiBadGatewayException,
} from './ApiError.js';

export class BffErrors {
  // リクエスト必須項目不足エラー
  static BFF400_01(details?: unknown): ApiBadRequestException {
    return new ApiBadRequestException({
      errorCode: 'BFF400_01',
      message: 'リクエストの必須項目が不足しています',
      details,
    });
  }

  // リクエスト形式不正エラー
  static BFF400_02(details?: unknown): ApiBadRequestException {
    return new ApiBadRequestException({
      errorCode: 'BFF400_01',
      message: 'リクエストの形式が正しくありません',
      details,
    });
  }

  // // 予期しないエラー
  // static BFF500_01(details?: unknown): ApiInternalServerErrorException {
  //   return new ApiInternalServerErrorException({
  //     errorCode: 'BFF500_01',
  //     message: 'BFF通信で予期しないエラーが発生しました',
  //     details,
  //   });
  // }

  // // 通信応答エラー
  // static BFF502_01(details?: unknown): ApiBadGatewayException {
  //   return new ApiBadGatewayException({
  //     errorCode: 'BFF502_01',
  //     message: 'BFF通信で応答エラーが発生しました',
  //     details,
  //   });
  // }
}
