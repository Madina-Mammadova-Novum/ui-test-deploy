import { createSlice } from '@reduxjs/toolkit';

import { cargoesAdapter, tankersAdapter } from '@/adapters';

const initialState = {
  role: 'owner',
  list: [],
  rules: false,
  sameAddress: false,
  isNested: false,
};

const signupSlice = createSlice({
  name: 'signupForm',
  initialState,
  reducers: {
    resetSlots: (state) => {
      state.list = [];
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setTankers: (state, { payload }) => {
      state.list = tankersAdapter(payload);
    },
    setCargoes: (state, { payload }) => {
      state.list = cargoesAdapter(payload);
    },
    setRules: (state, { payload }) => {
      state.rules = payload;
    },
    setAddress: (state, { payload }) => {
      state.sameAddress = payload;
    },
    checkNested: (state, { payload }) => {
      state.isNested = payload;
    },
  },
});

export const { setAddress, setRole, setRules, setTankers, setCargoes, checkNested, resetSlots } = signupSlice.actions;

export default signupSlice.reducer;
