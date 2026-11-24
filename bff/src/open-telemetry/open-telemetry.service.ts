import { Injectable } from '@nestjs/common';
import { trace, SpanStatusCode } from '@opentelemetry/api';

// Tracerを取得
const tracer = trace.getTracer('otel-practice');

@Injectable()
export class OpenTelemetryService {
  manual(): string {
    return tracer.startActiveSpan('OpenTelemetryService.manual', (span) => {
      try {
        // Spanに属性を追加
        span.setAttribute('open-telemetry.operation', 'manual');
        return 'Manual Instrumentation';
      } catch (error) {
        // エラー情報をSpanに記録
        if (error instanceof Error) {
          span.recordException(error);
        }

        span.setStatus({
          code: SpanStatusCode.ERROR,
        });

        throw error;
      } finally {
        // Spanを必ず終了する
        span.end();
      }
    });
  }
}
