import { createSlice } from '@reduxjs/toolkit';

import { fetchVesselsBySearch } from './actions';

import { SORT_OPTIONS } from '@/lib/constants';

const initialState = {
  toggle: false,
  request: false,
  loading: null,
  searchData: null,
  searchParams: null,
  error: null,
  sortingData: {
    range: [SORT_OPTIONS.asc, SORT_OPTIONS.dsc],
    directions: [SORT_OPTIONS.ballast, SORT_OPTIONS.arrival],
    currentRange: '',
    currentDirection: '',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    setRequest: (state, { payload }) => {
      state.request = payload;
    },
    setSortingParams: (state, { payload }) => {
      state.sortingData[payload.key] = payload.data;
    },
    setSearchParams: (state, { payload }) => {
      state.searchParams = payload;
      // Clear existing search data when new search params are set
      state.searchData = null;
    },
    resetError: (state) => {
      state.error = initialState.error;
    },
    onReset: (state) => {
      state.searchParams = initialState.searchParams;
      state.searchData = initialState.searchData;
      state.sortingData = initialState.sortingData;
      state.request = initialState.request;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVesselsBySearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVesselsBySearch.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.searchData = action.payload;
    });
    builder.addCase(fetchVesselsBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { onReset, resetError, setRequest, setSearchParams, setSortingParams } = searchSlice.actions;

export default searchSlice.reducer;
