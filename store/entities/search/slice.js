import { createSlice } from '@reduxjs/toolkit';

import { fetchVesselsBySearch } from './actions';

import { NAVIGATION_PARAMS } from '@/lib/constants';
import { options } from '@/utils/helpers';

const initialState = {
  toggle: false,
  request: false,
  loading: null,
  searchData: null,
  searchParams: null,
  error: null,
  prefilledSearchData: null,
  sortingData: {
    range: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    directions: options(['Ballast leg', 'Arrival']),
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
    },
    setSearchData: (state, { payload }) => {
      const updatedState = { ...state, searchData: payload };
      state.prefilledSearchData = updatedState.prefilledSearchData;
      state.searchData = updatedState.searchData;
    },
    setPrefilledSearchData: (state, { payload }) => {
      state.prefilledSearchData = payload;
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

export const {
  onReset,
  setToggle,
  setRequest,
  setSearchData,
  setSearchParams,
  setSortingParams,
  setPrefilledSearchData,
} = searchSlice.actions;

export default searchSlice.reducer;
