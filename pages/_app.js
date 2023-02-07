import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import 'tailwindcss/tailwind.css';
import 'react-day-picker/dist/style.css';
import PropTypes from 'prop-types';

import '@/styles/index.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const queryClient = new QueryClient();

const isServer = () => typeof window === 'undefined';
const isClient = () => typeof window !== 'undefined';

const debugMode = false;
const debugClientSide = false;

function OtakoyiApp({ Component, pageProps }) {
  if (debugMode) {
    return (
      <QueryClientProvider client={queryClient}>
        {/* Server side */}
        {!debugClientSide && isServer() && <Component {...pageProps} />}
        {/* Client side */}
        {debugClientSide && isClient() && <Component {...pageProps} />}
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

OtakoyiApp.defaultProps = {
  pageProps: {},
};

OtakoyiApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType.isRequired,
};

export default appWithTranslation(OtakoyiApp);
