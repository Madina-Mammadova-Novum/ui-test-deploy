import { createSlice } from '@reduxjs/toolkit';

/* Actions */
import { fetchUsers } from './actions';

const initialState = {
  data: [],
  loading: false,
  value: 10,
  error: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = [...payload];
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { increment } = userSlice.actions;

export default userSlice.reducer;
