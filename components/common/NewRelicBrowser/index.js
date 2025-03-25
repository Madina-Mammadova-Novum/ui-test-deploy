'use client';

import { useEffect } from 'react';

const NewRelicBrowser = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      // Correctly import the New Relic browser agent
      import('@newrelic/browser-agent/loaders/browser-agent')
        .then((module) => {
          try {
            const { BrowserAgent } = module;

            if (!BrowserAgent) {
              console.error('BrowserAgent class not found in the New Relic module');
              return;
            }

            // Create a new instance of BrowserAgent - just creating it is enough
            // The instance automatically hooks into browser events and starts monitoring
            // eslint-disable-next-line no-unused-vars
            const agent = new BrowserAgent({
              init: {
                distributed_tracing: {
                  enabled: true,
                },
                privacy: {
                  cookies_enabled: true,
                },
                ajax: {
                  deny_list: ['bam.eu01.nr-data.net'],
                },
                page_view_timing: {
                  enabled: true,
                },
                spa: {
                  enabled: true,
                },
              },
              info: {
                beacon: 'bam.eu01.nr-data.net',
                errorBeacon: 'bam.eu01.nr-data.net',
                licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY,
                applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID,
                agentID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID,
                trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY,
                sa: 1,
              },
              loader_config: {
                accountID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_ACCOUNT_ID,
                trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY,
                agentID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID,
                licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY,
                applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID,
              },
            });
          } catch (error) {
            console.error('Failed to initialize New Relic Browser:', error);
          }
        })
        .catch((error) => {
          console.error('Failed to load New Relic Browser agent module:', error);
        });
    }
  }, []);

  return null;
};

export default NewRelicBrowser;
