import { createSlice } from '@reduxjs/toolkit';

import { fetchUserNegotiating } from './actions';

const initialState = {
  loading: true,
  error: null,
  toggle: false,
  data: {
    totalPages: 0,
    offers: [],
    offerById: {},
  },
};

const negotiatingSlice = createSlice({
  name: 'negotiating',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserNegotiating.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserNegotiating.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserNegotiating.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { setToggle } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
