import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    token: '',
    personalDetails: {},
    isLoggedIn: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
