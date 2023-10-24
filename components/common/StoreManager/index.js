'use client';

import { memo } from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { PageLoader } from '@/elements/PageLoader';
import { persistore, store } from '@/store';

function StoreManager({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PageLoader text="Updating..." />} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default memo(StoreManager);
