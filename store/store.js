import { devToolsEnhancer } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authApi, citiesApi, portsApi, signupApi } from '@/store/entities';
import { reducer } from '@/store/reducers';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(citiesApi.middleware, signupApi.middleware, portsApi.middleware, authApi.middleware),
  devTools: process.env.NODE_ENV === 'development' && devToolsEnhancer(),
});

setupListeners(store.dispatch);

export default store;
