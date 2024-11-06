import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const serviceName = process.env.IDENTITY_NEW_RELIC_APP_NAME || 'next-app';
const otelTraceExporterEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://otlp.eu01.nr-data.net/v1/traces';
const apiKey = process.env.IDENTITY_NEW_RELIC_LICENSE_KEY;
const headers = {
  'api-key': apiKey,
};

// OTLP Trace exporter configuration
const traceExporter = new OTLPTraceExporter({
  url: otelTraceExporterEndpoint,
  headers,
});

// OTLP Metric exporter configuration
const metricExporter = new OTLPMetricExporter({
  url: 'https://otlp.eu01.nr-data.net/v1/metrics',
  headers,
});

// MeterProvider with PeriodicExportingMetricReader for metrics
const meterProvider = new MeterProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
});
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000, // Exports metrics every 60 seconds
  })
);

// Creating metrics
const meter = meterProvider.getMeter('http_metrics');

// Request Duration Metric (Histogram)
const requestDuration = meter.createHistogram('http_request_duration_seconds', {
  description: 'The duration of HTTP requests in seconds',
});

// Error Count Metric (Counter)
const errorCount = meter.createCounter('http_error_count', {
  description: 'The count of HTTP errors',
});

// NodeSDK setup for OpenTelemetry tracing
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
          // Customize HTTP span name to include method and route, or 'UNKNOWN_ROUTE' if URL is undefined
          span.updateName(`${request.method} ${request.url || 'UNKNOWN_ROUTE'}`);
        },
        responseHook: (span, response) => {
          // Calculate duration and record metrics based on response status
          const duration = span.endTime[0] - span.startTime[0] + (span.endTime[1] - span.startTime[1]) / 1e9;
          requestDuration.record(duration, {
            method: response.method,
            route: response.route,
            status_code: response.statusCode,
          });

          if (response.statusCode >= 400) {
            errorCount.add(1, {
              method: response.method,
              route: response.route,
              status_code: response.statusCode,
            });
          }
        },
      },
    }),
  ],
  spanProcessor: new BatchSpanProcessor(traceExporter),
});

// Start the SDK for tracing and metrics
sdk.start();
