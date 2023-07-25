import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  refetchOffers: false,
};

const negotiatingSlice = createSlice({
  name: 'negotiating',
  initialState,
  reducers: {
    refetchNegotiatingOffers: (state) => {
      state.refetchOffers = !state.refetchOffers;
    },
  },
});

export const { refetchNegotiatingOffers } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
