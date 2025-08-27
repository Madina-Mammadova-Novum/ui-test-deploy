// Completely disable instrumentation in development to avoid OpenTelemetry warnings
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'development';

if (isDevelopment) {
  // In development, just export nothing to prevent module compilation
  module.exports = {};
} else {
  // In production, load OpenTelemetry normally
  /* eslint-disable global-require */
  const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
  const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
  const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
  const { Resource } = require('@opentelemetry/resources');
  const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
  const { NodeSDK } = require('@opentelemetry/sdk-node');
  const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-node');
  const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
  /* eslint-enable global-require */

  const serviceName = process.env.IDENTITY_NEW_RELIC_APP_NAME || 'next-app';
  const otelTraceExporterEndpoint =
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://otlp.eu01.nr-data.net/v1/traces';
  const otelMetricExporterEndpoint =
    process.env.OTEL_METRIC_EXPORTER_OTLP_ENDPOINT || 'https://otlp.eu01.nr-data.net/v1/metrics';
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
    url: otelMetricExporterEndpoint,
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
      exportIntervalMillis: 30000, // Exports metrics every 30 seconds for faster verification
    })
  );

  // Creating error count metric
  const meter = meterProvider.getMeter('http_metrics');
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
        '@opentelemetry/instrumentation-winston': { enabled: false },
        '@opentelemetry/instrumentation-http': {
          enabled: true,
          requestHook: (span, request) => {
            // Customize HTTP span name to include method and route, or 'UNKNOWN_ROUTE' if URL is undefined
            span.updateName(`${request.method} ${request.url || 'UNKNOWN_ROUTE'}`);
          },
          responseHook: (span, response) => {
            // Record an error if the status code is >= 400
            if (response.statusCode >= 400) {
              errorCount.add(1, {
                method: response.method,
                route: response.route || 'UNKNOWN_ROUTE',
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
}
