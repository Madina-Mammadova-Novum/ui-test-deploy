'use client';

import { Provider as RTKProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from '@/store/store';

export default function ProviderManager({ children }) {
  return (
    <RTKProvider store={store}>
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={false} hideProgressBar />
      {children}
    </RTKProvider>
  );
}
