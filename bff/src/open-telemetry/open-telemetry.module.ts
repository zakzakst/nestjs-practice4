import { Module } from '@nestjs/common';
import { OpenTelemetryController } from './open-telemetry.controller.js';
import { OpenTelemetryService } from './open-telemetry.service.js';

@Module({
  controllers: [OpenTelemetryController],
  providers: [OpenTelemetryService]
})
export class OpenTelemetryModule {}
