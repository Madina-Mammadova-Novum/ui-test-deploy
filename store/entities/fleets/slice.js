import { createSlice } from '@reduxjs/toolkit';

import { fetchFleetsWithVessels, fetchPrefilledDataToUpdate, fetchUnassignedFleetData } from './actions';

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
    addVesselToFleetsState: (state, action) => {
      const { fleetId, tankerId } = action?.payload;

      // Try to find the vessel in unassigned fleet first
      let vessel = state.unassignedFleetData.find(({ id }) => id === tankerId);

      // If not found in unassigned fleet, try to find it in assigned fleets
      if (!vessel) {
        state.data.vessels.forEach((fleet) => {
          const foundVessel = fleet.vessels?.find((v) => v.id === tankerId);
          if (foundVessel) {
            vessel = foundVessel;
          }
        });
      }

      if (vessel) {
        state.data.vessels = state.data.vessels.map((fleet) =>
          fleet.id === fleetId ? { ...fleet, vessels: [{ ...vessel, fleetId }, ...fleet.vessels] } : fleet
        );
      }
    },
    addVesselToUnassignedFleetState: (state, action) => {
      const { tankerId } = action.payload;

      // Check if the vessel is already in the unassigned fleet
      const exists = state.unassignedFleetData.some((v) => v.id === tankerId);

      if (!exists) {
        // Try to find the vessel in assigned fleets
        let vessel = null;
        state.data.vessels.forEach((fleet) => {
          const foundVessel = fleet.vessels?.find((v) => v.id === tankerId);
          if (foundVessel) {
            vessel = foundVessel;
          }
        });

        // If found, add it to unassigned fleet
        if (vessel) {
          state.unassignedFleetData = [...state.unassignedFleetData, { ...vessel, fleetId: null }];
        }
      }
    },
    clearPrefilledState: (state) => {
      state.prefilledUpdateVesselState = initialState.prefilledUpdateVesselState;
    },
    updateVesselCategoryTwo: (state, action) => {
      const { vesselId, vesselCategoryTwoName } = action.payload;

      // Update in assigned fleets
      state.data.vessels = state.data.vessels.map((fleet) => ({
        ...fleet,
        vessels: fleet.vessels.map((vessel) =>
          vessel.id === vesselId
            ? {
                ...vessel,
                details: {
                  ...vessel.details,
                  tankerLink: {
                    ...vessel.details.tankerLink,
                    vesselCategoryTwos: {
                      ...vessel.details.tankerLink?.vesselCategoryTwos,
                      name: vesselCategoryTwoName,
                    },
                  },
                },
              }
            : vessel
        ),
      }));

      // Update in unassigned fleet
      state.unassignedFleetData = state.unassignedFleetData.map((vessel) =>
        vessel.id === vesselId
          ? {
              ...vessel,
              details: {
                ...vessel.details,
                tankerLink: {
                  ...vessel.details.tankerLink,
                  vesselCategoryTwos: {
                    ...vessel.details.tankerLink?.vesselCategoryTwos,
                    name: vesselCategoryTwoName,
                  },
                },
              },
            }
          : vessel
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
  addVesselToUnassignedFleetState,
  clearPrefilledState,
  setToggle,
  updateVesselCategoryTwo,
} = fleetsSlice.actions;

export default fleetsSlice.reducer;
