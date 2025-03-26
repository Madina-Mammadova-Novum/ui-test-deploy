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

            // Initialize config object
            const initConfig = {
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
            };

            // Add session_replay config only in production environment
            if (process.env.NODE_ENV === 'production') {
              initConfig.session_replay = {
                enabled: true,
                block_selector: '',
                mask_text_selector: '*',
                sampling_rate: 10.0,
                error_sampling_rate: 100.0,
                mask_all_inputs: true,
                collect_fonts: true,
                inline_images: false,
                inline_stylesheet: true,
                fix_stylesheets: true,
                preload: false,
                mask_input_options: {},
              };
            }

            // Create a new instance of BrowserAgent
            // eslint-disable-next-line no-unused-vars
            const agent = new BrowserAgent({
              init: initConfig,
              info: {
                beacon: 'bam.eu01.nr-data.net',
                errorBeacon: 'bam.eu01.nr-data.net',
                licenseKey: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY,
                applicationID: process.env.NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID,
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
