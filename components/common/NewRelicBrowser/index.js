'use client';

import { useEffect } from 'react';

const NewRelicBrowser = () => {
  const test = process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY;
  const test2 = process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID;
  const test3 = process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID;
  const test4 = process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY;
  const test5 = process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_ACCOUNT_ID;
  const backendApiUrl = process.env.BACKEND_API_URL;
  // eslint-disable-next-line no-console
  console.log({ test, test2, test3, test4, test5, backendApiUrl });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('NewRelicBrowser');
    // Only run in browser
    if (typeof window !== 'undefined') {
      // Correctly import the New Relic browser agent
      import('@newrelic/browser-agent/loaders/browser-agent')
        .then((module) => {
          // eslint-disable-next-line no-console
          console.log('New Relic Browser module loaded');
          try {
            // eslint-disable-next-line no-console
            console.log('New Relic Browser module loaded 2');
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
                licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY || 'NRJS-781ca6a265162a4f947',
                applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID || '538699265',
                agentID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID || '538699265',
                trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY || '4589435',
                sa: 1,
              },
              loader_config: {
                accountID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_ACCOUNT_ID || '4589435',
                trustKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY || '4589435',
                agentID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID || '538699265',
                licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY || 'NRJS-781ca6a265162a4f947',
                applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID || '538699265',
              },
            });
            // eslint-disable-next-line no-console
            console.log('New Relic Browser initialized successfully: ', agent);
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
