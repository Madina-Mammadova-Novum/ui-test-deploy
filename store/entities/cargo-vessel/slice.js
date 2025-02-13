import { createSlice } from '@reduxjs/toolkit';

import { fetchCargoCodes, fetchCargoTypes, fetchVesselNames } from './actions';

const initialState = {
  cargoTypes: [],
  cargoCodes: [],
  vesselNames: [],
  loading: {
    cargoTypes: false,
    cargoCodes: false,
    vesselNames: false,
  },
  error: {
    cargoTypes: null,
    cargoCodes: null,
    vesselNames: null,
  },
};

const cargoVesselSlice = createSlice({
  name: 'cargoVessel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Cargo Types
    builder
      .addCase(fetchCargoTypes.pending, (state) => {
        state.loading.cargoTypes = true;
        state.error.cargoTypes = null;
      })
      .addCase(fetchCargoTypes.fulfilled, (state, action) => {
        state.cargoTypes = action.payload;
        state.loading.cargoTypes = false;
      })
      .addCase(fetchCargoTypes.rejected, (state, action) => {
        state.loading.cargoTypes = false;
        state.error.cargoTypes = action.error.message;
      });

    // Cargo Codes
    builder
      .addCase(fetchCargoCodes.pending, (state) => {
        state.loading.cargoCodes = true;
        state.error.cargoCodes = null;
      })
      .addCase(fetchCargoCodes.fulfilled, (state, action) => {
        state.cargoCodes = action.payload;
        state.loading.cargoCodes = false;
      })
      .addCase(fetchCargoCodes.rejected, (state, action) => {
        state.loading.cargoCodes = false;
        state.error.cargoCodes = action.error.message;
      });

    // Vessel Names
    builder
      .addCase(fetchVesselNames.pending, (state) => {
        state.loading.vesselNames = true;
        state.error.vesselNames = null;
      })
      .addCase(fetchVesselNames.fulfilled, (state, action) => {
        state.vesselNames = action.payload;
        state.loading.vesselNames = false;
      })
      .addCase(fetchVesselNames.rejected, (state, action) => {
        state.loading.vesselNames = false;
        state.error.vesselNames = action.error.message;
      });
  },
});

export default cargoVesselSlice.reducer;
