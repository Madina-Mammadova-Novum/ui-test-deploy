'use client';

import { Provider as RTKProvider } from 'react-redux';

import store from '@/store';

export default function Providers({ children }) {
  return <RTKProvider store={store}>{children}</RTKProvider>;
}
