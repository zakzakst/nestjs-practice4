import { Controller, Get } from '@nestjs/common';

@Controller('open-telemetry')
export class OpenTelemetryController {
  @Get('slow')
  async getSlow(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return 'Slow API completed';
  }
}
