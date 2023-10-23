import { devToolsEnhancer } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer } from '@/store/reducers';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'general', 'notifications', 'chat'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const getStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV === 'development' && devToolsEnhancer(),
  });

  const persistore = persistStore(store);

  return { store, persistore };
};
