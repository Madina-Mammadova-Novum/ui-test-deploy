/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

const MatomoAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isMatomoEnabled = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ENABLE_MATOMO === 'true';

  // Initialize Matomo Tag Manager
  useEffect(() => {
    if (typeof window !== 'undefined' && isMatomoEnabled) {
      // Initialize Matomo Tag Manager
      window._mtm = window._mtm || [];
      window._mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.matomo.cloud/shiplink.matomo.cloud/container_DIxEkjyv.js';

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }
  }, [isMatomoEnabled]);

  // Initialize Matomo Analytics
  useEffect(() => {
    // Initialize Matomo if enabled
    if (typeof window !== 'undefined' && isMatomoEnabled) {
      window._paq = window._paq || [];

      // Set document title
      window._paq.push(['setDocumentTitle', `${document.domain}/${document.title}`]);

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
      }
    }
  }, [pathname, searchParams, isMatomoEnabled]);

  return null;
};

export default MatomoAnalytics;
