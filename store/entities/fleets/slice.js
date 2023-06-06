import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  refetch: false,
};

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState,
  reducers: {
    refetchFleets: (state) => {
      state.refetch = !state.refetch;
    },
  },
});

export const { refetchFleets } = fleetsSlice.actions;

export default fleetsSlice.reducer;
