'use client';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ProvidersPropTypes } from '@/lib/types';

import { persistore, store } from '@/store';

function StoreManager({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
}

StoreManager.propTypes = ProvidersPropTypes;

export default StoreManager;
