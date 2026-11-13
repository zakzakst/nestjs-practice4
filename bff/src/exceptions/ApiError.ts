type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

type ApiErrorOptions = {
  code?: string;
  logLevel?: LogLevel;
  details?: unknown;
};

export class ApiError extends Error {
  public readonly code?: string;
  public readonly logLevel?: LogLevel;
  public readonly details?: unknown;

  constructor(message: string, options?: ApiErrorOptions) {
    super();
    this.message = message;
    this.code = options?.code;
    this.logLevel = options?.logLevel || 'ERROR';
    this.details = options?.details;
  }
}
