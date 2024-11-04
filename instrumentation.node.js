import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const serviceName = process.env.IDENTITY_NEW_RELIC_APP_NAME || 'next-app';
const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://otlp.nr-data.net/v1';
const apiKey = process.env.IDENTITY_NEW_RELIC_LICENSE_KEY;

// Ensure this code runs only on the server
if (typeof window === 'undefined') {
  // Configure the trace exporter for spans
  const traceExporter = new OTLPTraceExporter({
    url: `${otelEndpoint}/traces`,
    headers: {
      'api-key': apiKey,
    },
  });

  // Configure the metrics exporter
  const metricExporter = new OTLPMetricExporter({
    url: `${otelEndpoint}/metrics`,
    headers: {
      'api-key': apiKey,
    },
  });

  // Set up the periodic metric reader
  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000, // Export every 60 seconds
  });

  // Initialize the Node SDK with tracing and metrics
  const sdk = new NodeSDK({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: serviceName,
    }),
    spanProcessor: new SimpleSpanProcessor(traceExporter),
    metricReader, // Include metric reader
  });

  // Start the SDK
  sdk
    .start()
    .then(() => {
      /* eslint-disable no-console */
      console.log('OpenTelemetry SDK with metrics and tracing started for Node');
    })
    .catch((error) => {
      /* eslint-disable no-console */
      console.error('Error starting OpenTelemetry SDK:', error);
    });
}
