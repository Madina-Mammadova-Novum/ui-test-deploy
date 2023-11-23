import { createSlice } from '@reduxjs/toolkit';

import { fetchFleetsWithVessels, fetchPrefilledDataToUpdate, fetchUnassignedFleetData } from './actions';
// import { userTankersDetailsAdapter } from '@/adapters/vessel';

const initialState = {
  loading: true,
  refetch: false,
  toggle: false,
  unassignedFleetData: [],
  prefilledUpdateVesselState: {
    loading: true,
    data: {},
    ports: [],
    countries: [],
    tankerTypes: [],
  },
  data: {
    vessels: [],
    totalPages: 0,
  },
};

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    refetchFleets: (state) => {
      state.refetch = !state.refetch;
    },
    deleteFleetFromState: (state, action) => {
      state.data.vessels = state.data.vessels.filter(({ id }) => id !== action?.payload);
    },
    deleteVesselFromFleetsState: (state, action) => {
      const { tankerId, fleetId } = action?.payload;
      state.data.vessels = state.data.vessels.map((fleet) =>
        fleet.id === fleetId ? { ...fleet, vessels: fleet.vessels.filter((vessel) => vessel.id !== tankerId) } : fleet
      );
    },
    deleteVesselFromUnassignedFleetsState: (state, action) => {
      state.unassignedFleetData = state.unassignedFleetData.filter(({ id }) => id !== action.payload);
    },
    updateUnassignedFleet: (state, action) => {
      const { id, tankers } = action.payload;
      const updatedTanker = state.unassignedFleetData.find((fleet) => fleet.id === id);

      if (updatedTanker) state.unassignedFleetData = tankers;
    },
    addVesselToFleetsState: (state, action) => {
      const { fleetId, tankerId } = action?.payload;
      const vessel = state.unassignedFleetData.find(({ id }) => id === tankerId);
      state.data.vessels = state.data.vessels.map((fleet) =>
        fleet.id === fleetId ? { ...fleet, vessels: [{ ...vessel, fleetId }, ...fleet.vessels] } : fleet
      );
    },
    clearPrefilledState: (state) => {
      state.prefilledUpdateVesselState = initialState.prefilledUpdateVesselState;
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

    builder.addCase(fetchPrefilledDataToUpdate.fulfilled, (state, action) => {
      state.prefilledUpdateVesselState.loading = false;
      state.prefilledUpdateVesselState.data = action.payload?.data;
      state.prefilledUpdateVesselState.ports = action.payload?.ports;
      state.prefilledUpdateVesselState.countries = action.payload?.countries;
      state.prefilledUpdateVesselState.tankerTypes = action.payload?.tankerTypes;
    });

    builder.addCase(fetchPrefilledDataToUpdate.rejected, (state) => {
      state.prefilledUpdateVesselState.loading = false;
    });
  },
});

export const {
  refetchFleets,
  deleteFleetFromState,
  deleteVesselFromFleetsState,
  deleteVesselFromUnassignedFleetsState,
  addVesselToFleetsState,
  clearPrefilledState,
  updateUnassignedFleet,
  setToggle,
} = fleetsSlice.actions;

export default fleetsSlice.reducer;
