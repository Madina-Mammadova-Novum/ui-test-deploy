import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACTION } from '@/store/entities/general/types';

/* Services */
import { getCountries, getPortsForSearchForm } from '@/services';

export const fetchPorts = createAsyncThunk(ACTION.GET_PORTS, async ({ query, skip, pageSize }) => {
  const { data: searchPorts } = await getPortsForSearchForm({ query, skip, pageSize });

  return { searchPorts };
});

export const fetchCountries = createAsyncThunk(ACTION.GET_COUNTRIES, async () => {
  const { data } = await getCountries();

  return data;
});
