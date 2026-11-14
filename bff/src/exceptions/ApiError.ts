import {
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

type ApiErrorOptions = {
  errorCode: string;
  message?: string;
  logLevel?: LogLevel;
  details?: unknown;
};

export class ApiInternalServerErrorException extends InternalServerErrorException {
  constructor(options: ApiErrorOptions) {
    super({
      statusCode: 500,
      errorCode: options.errorCode,
      message: options.message ?? '予期しないエラーが発生しました',
      logLevel: options.logLevel ?? 'ERROR',
      details: options.details,
    });
  }
}

export class ApiBadGatewayException extends BadGatewayException {
  constructor(options: ApiErrorOptions) {
    super({
      statusCode: 502,
      errorCode: options.errorCode,
      message: options.message ?? '通信応答エラーが発生しました',
      logLevel: options.logLevel ?? 'ERROR',
      details: options.details,
    });
  }
}
