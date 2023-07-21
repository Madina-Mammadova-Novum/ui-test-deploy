import { createSlice } from '@reduxjs/toolkit';

import { fetchCountries, fetchPorts } from './actions';

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
  extraReducers: (builder) => {
    builder.addCase(fetchPorts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPorts.fulfilled, (state, action) => {
      state.loading = false;
      state.data.ports = action.payload?.data;
    });
    builder.addCase(fetchPorts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data.countries = action.payload?.data;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default generalSlice.reducer;
