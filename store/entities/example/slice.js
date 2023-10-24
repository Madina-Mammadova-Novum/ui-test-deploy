import { createSlice } from '@reduxjs/toolkit';

import { fetchUsers } from '@/store/entities/example/actions';

const initialState = {
  data: [],
  pending: false,
  error: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
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

export default userSlice.reducer;
