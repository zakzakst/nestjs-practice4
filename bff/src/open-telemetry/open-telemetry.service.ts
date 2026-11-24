import { Injectable } from '@nestjs/common';
import { trace, SpanStatusCode, metrics } from '@opentelemetry/api';

// Tracerを取得
const tracer = trace.getTracer('otel-practice');

// Meterを取得
const meter = metrics.getMeter('otel-practice');

// Counterを作成
const requestCounter = meter.createCounter('app.request.count', {
  description: 'Application request count',
  unit: '{request}',
});

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

  count(): string {
    // カウントを1増やす
    requestCounter.add(1);
    return 'Count';
  }
}
