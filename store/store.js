import { devToolsEnhancer } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer } from '@/store/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'general', 'notifications', 'chat'],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), // could be extended by api reducers
  devTools:
    process.env.NODE_ENV === 'development' && devToolsEnhancer({ serialize: false, features: { persist: true } }),
});

export const persistore = persistStore(store);
