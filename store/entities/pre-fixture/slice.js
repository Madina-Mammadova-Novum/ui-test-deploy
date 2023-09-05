import { createSlice } from '@reduxjs/toolkit';

import { fetchPrefixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const userSlice = createSlice({
  name: 'pre-fixture',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPrefixtureOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPrefixtureOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchPrefixtureOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default userSlice.reducer;
