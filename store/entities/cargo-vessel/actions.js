import { createAsyncThunk } from '@reduxjs/toolkit';

import { CARGO_VESSEL } from './types';

import { getCargoCodes } from '@/services/cargo';
import { getCargoTypes } from '@/services/cargoTypes';
import { getVesselNames } from '@/services/vessel';

export const fetchCargoTypes = createAsyncThunk(CARGO_VESSEL.FETCH_CARGO_TYPES, async () => {
  const response = await getCargoTypes();
  return response;
});

export const fetchCargoCodes = createAsyncThunk(CARGO_VESSEL.FETCH_CARGO_CODES, async ({ stages = null } = {}) => {
  const response = await getCargoCodes({ stages });
  return response;
});

export const fetchVesselNames = createAsyncThunk(CARGO_VESSEL.FETCH_VESSEL_NAMES, async ({ stages = null } = {}) => {
  const response = await getVesselNames({ stages });
  return response;
});
