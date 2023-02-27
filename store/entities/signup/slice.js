import { createSlice } from '@reduxjs/toolkit';

import { imoAdapter } from '@/adapters/imoAdapter';

const initialState = {
  role: 'owner',
  imos: [],
};

const signupSlice = createSlice({
  name: 'signupForm',
  initialState,
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setImos: (state, { payload }) => {
      state.imos = imoAdapter(payload);
    },
  },
});

export const { setRole, setTankers, setImos } = signupSlice.actions;

export default signupSlice.reducer;
