import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  personalDetails: {},
  params: {
    sidebarCollapsed: false,
    sidebarSubMenuOpened: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleCollapse: (state, { payload }) => {
      state.params.sidebarCollapsed = payload;
    },
    handleToggle: (state, { payload }) => {
      state.params.sidebarSubMenuOpened = payload;
    },
  },
});

export const { handleCollapse, handleToggle } = userSlice.actions;

export default userSlice.reducer;
