import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACTION } from '@/store/entities/general/types';

/* Services */
import { getCountries, getPorts, getPortsForSearcForm } from '@/services';

export const fetchPorts = createAsyncThunk(ACTION.GET_PORTS, async () => {
  const [{ data: allPorts }, { data: searchPorts }] = await Promise.all([getPorts(), getPortsForSearcForm()]);

  return {
    allPorts,
    searchPorts,
  };
});

export const fetchSearchPorts = createAsyncThunk(ACTION.GET_PORTS, async () => {
  const { data } = await getPortsForSearcForm();

  return {
    data,
  };
});

export const fetchCountries = createAsyncThunk(ACTION.GET_COUNTRIES, async () => {
  const { data } = await getCountries();

  return data;
});
