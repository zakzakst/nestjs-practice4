import { Controller, Get } from '@nestjs/common';
import { OpenTelemetryService } from './open-telemetry.service.js';

@Controller('open-telemetry')
export class OpenTelemetryController {
  constructor(private readonly openTelemetryService: OpenTelemetryService) {}

  @Get('slow')
  async getSlow(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return 'Slow API completed';
  }

  @Get('manual')
  manual() {
    return this.openTelemetryService.manual();
  }
}
