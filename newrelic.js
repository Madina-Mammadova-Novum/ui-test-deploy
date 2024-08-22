// eslint-disable-next-line
'use strict';

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * This application_logging block shows the default configuration. That is,
   * it is not technically necessary; if it were omitted completely, we'd still
   * get the same configuration applied.
   *
   * We are including it here for illustrative purposes. With log forwarding
   * enabled, the Pino instance returned by `lib/logger.js` will be instrumented
   * by the `newrelic` agent and ship logs to New Relic so that they can be
   * viewed in the dashboard.
   */
  app_name: ['shiplink-frontend-ui'],
  license_key: 'eu01xx22e614a2f80ab4b2045f8f532aa258NRAL',
  application_logging: {
    forwarding: {
      enabled: true,
    },
  },
  distributed_tracing: {
    /**
     * Enables/disables distributed tracing.
     *
     * @env NEW_RELIC_DISTRIBUTED_TRACING_ENABLED
     */
    enabled: true,
  },
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    enabled: false,
    level: 'trace',
  },

  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
};
