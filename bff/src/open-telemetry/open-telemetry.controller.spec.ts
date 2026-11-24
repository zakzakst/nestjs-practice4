import { Test, TestingModule } from '@nestjs/testing';
import { OpenTelemetryController } from './open-telemetry.controller.js';

describe('OpenTelemetryController', () => {
  let controller: OpenTelemetryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenTelemetryController],
    }).compile();

    controller = module.get<OpenTelemetryController>(OpenTelemetryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
