import { createSlice } from '@reduxjs/toolkit';

import { fetchUserProfileData } from './actions';

const initialState = {
  loading: true,
  error: null,
  role: null,
  isAuthenticated: false,
  data: {
    personalDetails: {},
    companyDetails: {},
  },
  params: {
    sidebarCollapsed: false,
    sidebarSubMenuOpened: false,
  },
};

const userSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setRoleIdentity: (state, { payload }) => {
      state.role = payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },

    handleCollapse: (state, { payload }) => {
      state.params.sidebarCollapsed = payload;
    },
    handleToggle: (state, { payload }) => {
      state.params.sidebarSubMenuOpened = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfileData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserProfileData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { handleCollapse, handleToggle, setRoleIdentity, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
