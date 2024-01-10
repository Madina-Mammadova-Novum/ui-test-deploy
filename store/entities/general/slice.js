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
    params: {
      sidebarCollapsed: false,
      sidebarSubMenuOpened: false,
    },
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    handleCollapse: (state, { payload }) => {
      state.data.params.sidebarCollapsed = payload;
    },
    handleToggle: (state, { payload }) => {
      state.data.params.sidebarSubMenuOpened = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPorts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPorts.fulfilled, (state, { payload }) => {
      state.data.ports = payload;
    });
    builder.addCase(fetchPorts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.data.countries = payload;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { handleCollapse, handleToggle } = generalSlice.actions;

export default generalSlice.reducer;
