import { createSlice } from '@reduxjs/toolkit';

import { fetchUserVessels } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    vessels: [],
  },
};

const userSlice = createSlice({
  name: 'vessels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserVessels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserVessels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserVessels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default userSlice.reducer;
