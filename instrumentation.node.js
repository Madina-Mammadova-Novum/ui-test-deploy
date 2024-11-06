import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const serviceName = process.env.IDENTITY_NEW_RELIC_APP_NAME || 'next-app';
const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://otlp.nr-data.net/v1/traces',
  headers: {
    'api-key': process.env.IDENTITY_NEW_RELIC_LICENSE_KEY,
  },
});

// TODO: BatchSpanProcessor settings
// const batchSpanProcessor = new BatchSpanProcessor(traceExporter, {
//   maxExportBatchSize: 200, // Increased batch size for higher throughput and more data per export
//   scheduledDelayMillis: 2000, // Reduced delay for near real-time exporting every 2 seconds
//   exportTimeoutMillis: 30000, // Timeout of 30 seconds remains ideal for reliability
//   maxQueueSize: 4000, // Increased queue size to handle higher traffic spikes
// });

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-net': { enabled: false },
      '@opentelemetry/instrumentation-dns': { enabled: false },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        requestHook: (span, request) => {
          // Customize HTTP span name to include method and route
          span.updateName(`${request.method} ${request.url || 'UNKNOWN_ROUTE'}`);
        },
      },
    }),
  ],
  spanProcessor: new BatchSpanProcessor(traceExporter),
});

sdk.start();
