import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenTelemetryService {
  manual(): string {
    return 'Manual Instrumentation';
  }
}
