import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  error: null,
  data: {
    ports: {
      searchPorts: [],
      allPorts: [],
    },
    countries: [],
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setGeneralData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setGeneralData } = generalSlice.actions;

export default generalSlice.reducer;
