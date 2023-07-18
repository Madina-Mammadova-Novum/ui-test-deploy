import { createSlice } from '@reduxjs/toolkit';

import { fetchUserVessels } from './actions';

import { userTankersDetailsAdapter } from '@/adapters/vessel';

const initialState = {
  loading: true,
  error: null,
  data: {
    vessels: [],
    totalPages: 0,
  },
};

const userSlice = createSlice({
  name: 'vessels',
  initialState,
  reducers: {
    updateTankersByFleetId: (state, action) => {
      const { fleetId, tankers } = action.payload;
      const updatedVessel = state.data.vessels.find((vessel) => vessel.fleetId === fleetId);

      if (updatedVessel) {
        updatedVessel.tankers = userTankersDetailsAdapter({ data: tankers });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserVessels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserVessels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserVessels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateTankersByFleetId } = userSlice.actions;

export default userSlice.reducer;
