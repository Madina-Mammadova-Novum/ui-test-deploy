import { createSlice } from '@reduxjs/toolkit';

import { fetchOnSubsOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const userSlice = createSlice({
  name: 'on-subs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOnSubsOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnSubsOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchOnSubsOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default userSlice.reducer;
