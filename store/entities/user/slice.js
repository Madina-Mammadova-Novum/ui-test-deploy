import { createSlice } from '@reduxjs/toolkit';

// import { loadState } from '@/lib/localStorage';

// const localState = loadState('persist:user');

// const sidebarSize = JSON.parse(localState?.user)?.params?.sidebarCollapsed;

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
    handleOpen: (state, { payload }) => {
      state.params.sidebarSubMenuOpened = payload;
    },
  },
});

export const { handleCollapse, handleOpen } = userSlice.actions;

export default userSlice.reducer;
