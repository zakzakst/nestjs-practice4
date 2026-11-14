import {
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

type ApiErrorOptions = {
  statusCode?: number;
  logLevel?: LogLevel;
  errorCode: string;
  message: string;
  details?: unknown;
};

export class ApiInternalServerErrorException extends InternalServerErrorException {
  constructor(options: ApiErrorOptions) {
    super();
  }
}
