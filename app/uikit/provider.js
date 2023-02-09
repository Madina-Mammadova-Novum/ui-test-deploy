'use client';

import { Provider as RTKProvider } from 'react-redux';

import store from '@/store/store';

// eslint-disable-next-line react/prop-types
export default function Providers({ children }) {
  return <RTKProvider store={store}>{children}</RTKProvider>;
}
