import { createSlice } from '@reduxjs/toolkit';

import { fetchVesselsBySearch } from './actions';

const initialState = {
  toggle: false,
  loading: null,
  searchData: null,
  searchParams: null,
  error: null,
  prefilledSearchData: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVesselsBySearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVesselsBySearch.fulfilled, (state, action) => {
      state.loading = false;
      state.searchData = action.payload;
    });
    builder.addCase(fetchVesselsBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSearchData, setPrefilledSearchData, setToggle, setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
