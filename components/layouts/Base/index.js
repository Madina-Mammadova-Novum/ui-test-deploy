import newrelic from 'newrelic';
import Script from 'next/script';

import { BaseLayoutPropTypes } from '@/lib/types';
import '@/styles/index.css';

export default async function BaseLayout({ children }) {
  if (process.env.NODE_ENV === 'production') {
    if (!newrelic.agent.collector.isConnected()) {
      await new Promise((resolve) => {
        newrelic.agent.on('connected', resolve);
      });
    }
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  });

  return (
    <html lang="en">
      <head />
      <Script id="nr-browser-agent" dangerouslySetInnerHTML={{ __html: browserTimingHeader }} />
      <body>{children}</body>
    </html>
  );
}

BaseLayout.propTypes = BaseLayoutPropTypes;
