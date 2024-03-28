import { createAsyncThunk } from '@reduxjs/toolkit';

import { SEARCH } from './types';

import { searchVessels } from '@/services/vessel';

export const fetchVesselsBySearch = createAsyncThunk(
  SEARCH.GET_VESSELS_BY_SEARCH,
  async (props, { rejectWithValue }) => {
    const { data, error } = await searchVessels({ data: props });

    if (error) {
      return rejectWithValue(error);
    }

    return data;
  }
);
