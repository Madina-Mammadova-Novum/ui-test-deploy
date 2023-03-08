import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { cargoesAdapter, tankersAdapter } from '@/adapters';

const initialState = {
  role: 'owner',
  list: [],
  rules: false,
  sameAddress: false,
  isNested: false,
  submitedData: {},
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
    removeCargoe: (state) => {
      state.list.pop();
    },
    addCargoe: (state) => {
      state.list = [...state.list, ...cargoesAdapter(1)];
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
    setData: (state, { payload }) => {
      state.submitedData = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setAddress,
  setRole,
  addCargoe,
  removeCargoe,
  setRules,
  setTankers,
  setCargoes,
  checkNested,
  resetSlots,
  setData,
} = signupSlice.actions;

export default signupSlice.reducer;
