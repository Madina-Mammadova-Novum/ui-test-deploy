/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { persistore, store } from '@/store/store';

export default function StoreManager({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
