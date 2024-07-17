// instrumentation.ts
import { registerOTel } from '@vercel/otel'
import { SamplingDecision } from '@opentelemetry/sdk-trace-base'
import { trace, Context } from '@opentelemetry/api'

export function register() {
  registerOTel({
    serviceName: 'next-danube-app',
    traceExporter: 'auto',
    spanProcessors: ['auto'],
    traceSampler: {
      shouldSample: (context: Context) => {
        // Always sample all spans
        console.log('Sampling decision:', SamplingDecision.RECORD_AND_SAMPLED);
        return {
          decision: SamplingDecision.RECORD_AND_SAMPLED,
        };
      },
    },
  });
  console.log('instrumentation registered')
}