import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACTION } from '@/store/entities/general/types';

/* Services */
import { getCountries, getPortsForSearcForm } from '@/services';

export const fetchPorts = createAsyncThunk(ACTION.GET_PORTS, async () => {
  const { data: searchPorts } = await getPortsForSearcForm();

  return {
    searchPorts,
  };
});

export const fetchCountries = createAsyncThunk(ACTION.GET_COUNTRIES, async () => {
  const { data } = await getCountries();

  return data;
});
