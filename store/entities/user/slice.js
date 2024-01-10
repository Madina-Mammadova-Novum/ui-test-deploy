import { createSlice } from '@reduxjs/toolkit';

import { fetchUserProfileData } from './actions';

const initialState = {
  loading: false,
  error: null,
  data: {
    personalDetails: {},
    companyDetails: {},
  },
};

const userSlice = createSlice({
  name: 'account',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfileData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserProfileData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default userSlice.reducer;
