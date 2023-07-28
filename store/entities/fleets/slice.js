import { createSlice } from '@reduxjs/toolkit';

import { fetchFleetsWithVessels } from './actions';

const initialState = {
  loading: true,
  refetch: false,
  data: [],
};

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState,
  reducers: {
    refetchFleets: (state) => {
      state.refetch = !state.refetch;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFleetsWithVessels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFleetsWithVessels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchFleetsWithVessels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { refetchFleets } = fleetsSlice.actions;

export default fleetsSlice.reducer;
