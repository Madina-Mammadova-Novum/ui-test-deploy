/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

const MatomoAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if Matomo should be enabled
  // Enable in production OR if explicitly enabled for dev testing
  // const isMatomoEnabled = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_MATOMO === 'true';
  const isMatomoEnabled = true;

  useEffect(() => {
    // Initialize Matomo if enabled
    if (typeof window !== 'undefined' && isMatomoEnabled) {
      window._paq = window._paq || [];

      // Set document title
      window._paq.push(['setDocumentTitle', `${document.domain}/${document.title}`]);

      // Set cookie domain
      window._paq.push(['setCookieDomain', '*.ship.link']);
      window._paq.push(['setDomains', ['*.ship.link']]);

      // Initial page view tracking removed from here to avoid duplication
      window._paq.push(['enableLinkTracking']);

      // Set up tracker
      const u = 'https://shiplink.matomo.cloud/';
      window._paq.push(['setTrackerUrl', `${u}matomo.php`]);
      window._paq.push(['setSiteId', '1']);

      // Add script to the DOM
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.matomo.cloud/shiplink.matomo.cloud/matomo.js';

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      // Log for testing in development
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('Matomo Analytics initialized for testing');
      }
    }
  }, [isMatomoEnabled]);

  // Track route changes for SPA
  useEffect(() => {
    // Only track if enabled
    if (isMatomoEnabled) {
      if (window._paq) {
        // Get the URL with query parameters if any
        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

        // Track the page view
        window._paq.push(['setCustomUrl', url]);
        window._paq.push(['setDocumentTitle', `${document.domain}/${document.title}`]);
        window._paq.push(['trackPageView']);

        // Log for testing in development
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log('Matomo page view tracked:', url);
        }
      }
    }
  }, [pathname, searchParams, isMatomoEnabled]);

  return null;
};

export default MatomoAnalytics;
