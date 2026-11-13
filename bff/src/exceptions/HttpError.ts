type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export class HttpError extends Error {
  public code: string;
  public logLevel: LogLevel;
  public details: unknown;

  constructor(code: string) {
    super();
    this.code = code;
  }
}
