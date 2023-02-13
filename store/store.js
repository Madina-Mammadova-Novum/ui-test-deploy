import { devToolsEnhancer } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '@/store/reducers';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development' && devToolsEnhancer(),
});

export default store;
