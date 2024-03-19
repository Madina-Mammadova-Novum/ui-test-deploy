import { createAsyncThunk } from '@reduxjs/toolkit';

import { SEARCH } from './types';

import { searchVessels } from '@/services/vessel';

export const fetchVesselsBySearch = createAsyncThunk(
  SEARCH.GET_VESSELS_BY_SEARCH,
  async (pagination, { getState, rejectWithValue }) => {
    const { search } = getState();

    if (search?.searchParams) {
      const { data, error } = await searchVessels({ ...pagination, ...search.searchParams });

      if (error) {
        return rejectWithValue(error);
      }

      return data;
    }

    return null;
  }
);
