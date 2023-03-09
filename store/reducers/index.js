// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import { auth, authApi, citiesApi, portsApi, signup, signupApi, system } from '@/store/entities';

const apiReducers = () => ({
  [citiesApi.reducerPath]: citiesApi.reducer,
  [portsApi.reducerPath]: portsApi.reducer,
  [signupApi.reducerPath]: signupApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const reducer = combineReducers({
  system,
  signup,
  auth,
  ...apiReducers(),
});
