import { createSlice } from '@reduxjs/toolkit';

import { fetchFleetsWithVessels, fetchUnassignedFleetData } from './actions';

const initialState = {
  loading: true,
  refetch: false,
  unassignedFleetData: [],
  data: [],
};

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState,
  reducers: {
    refetchFleets: (state) => {
      state.refetch = !state.refetch;
    },
    deleteFleetFromState: (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action?.payload);
    },
    deleteVesselFromFleetsState: (state, action) => {
      const { tankerId, fleetId } = action?.payload;
      state.data = state.data.map((fleet) =>
        fleet.id === fleetId ? { ...fleet, vessels: fleet.vessels.filter((vessel) => vessel.id !== tankerId) } : fleet
      );
    },
    deleteVesselFromUnassignedFleetsState: (state, action) => {
      state.unassignedFleetData = state.unassignedFleetData.filter(({ id }) => id !== action.payload);
    },
    addVesselToFleetsState: (state, action) => {
      const { fleetId, tankerId } = action?.payload;
      const vessel = state.unassignedFleetData.find(({ id }) => id === tankerId);
      state.data = state.data.map((fleet) =>
        fleet.id === fleetId ? { ...fleet, vessels: [{ ...vessel, fleetId }, ...fleet.vessels] } : fleet
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFleetsWithVessels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFleetsWithVessels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchFleetsWithVessels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(fetchUnassignedFleetData.fulfilled, (state, action) => {
      state.unassignedFleetData = action.payload?.data;
    });
  },
});

export const {
  refetchFleets,
  deleteFleetFromState,
  deleteVesselFromFleetsState,
  deleteVesselFromUnassignedFleetsState,
  addVesselToFleetsState,
} = fleetsSlice.actions;

export default fleetsSlice.reducer;
