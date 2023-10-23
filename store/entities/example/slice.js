import { createSlice } from '@reduxjs/toolkit';
/* Actions */

import { fetchUsers } from '@/store/entities/example/actions';

const initialState = {
  data: [],
  pending: false,
  error: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    rehydrate(state, { payload }) {
      state.data = payload.data;
      state.pending = payload.pending;
      state.error = payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = [...payload];
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.pending = true;
    });
  },
});

export const { rehydrate } = userSlice.actions;

export default userSlice.reducer;
