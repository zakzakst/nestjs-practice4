import {
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';

export class JPErrors {
  // 予期しないエラー
  static JP500_01(details?: unknown): InternalServerErrorException {
    return new InternalServerErrorException({
      statusCode: 500,
      errorCode: 'JP500_01',
      message: '外部API通信で予期しないエラーが発生しました',
      details,
    });
  }

  // 通信応答エラー
  static JP502_01(details?: unknown): BadGatewayException {
    return new BadGatewayException({
      statusCode: 502,
      errorCode: 'JP502_01',
      message: '外部API通信で応答エラーが発生しました',
      details,
    });
  }
}
