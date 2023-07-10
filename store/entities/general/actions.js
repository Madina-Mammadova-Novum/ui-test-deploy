import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACTION } from '@/store/entities/general/types';

/* Services */
import { getCountries, getPorts } from '@/services';

export const fetchPorts = createAsyncThunk(ACTION.GET_PORTS, async () => {
  const { data } = await getPorts();

  return {
    data,
  };
});

export const fetchCountries = createAsyncThunk(ACTION.GET_COUNTRIES, async () => {
  const { data } = await getCountries();

  return {
    data,
  };
});
