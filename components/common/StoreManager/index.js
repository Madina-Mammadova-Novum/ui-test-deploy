'use client';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { PageLoader } from '@/elements/PageLoader';
import { getStore } from '@/store';

export default function StoreManager({ children }) {
  const { store, persistore } = getStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<PageLoader text="Uploading..." />} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
