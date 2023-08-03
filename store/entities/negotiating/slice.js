import { createSlice } from '@reduxjs/toolkit';

import { fetchNegotiatingOffers } from './actions';

const initialState = {
  refetchOffers: false,
  negotiatingOffers: {
    incoming: [],
    sent: [],
    failed: [],
  },
};

const negotiatingSlice = createSlice({
  name: 'negotiating',
  initialState,
  reducers: {
    refetchNegotiatingOffers: (state) => {
      state.refetchOffers = !state.refetchOffers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNegotiatingOffers.fulfilled, (state, action) => {
      state.negotiatingOffers = action.payload?.data;
    });
  },
});

export const { refetchNegotiatingOffers } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
