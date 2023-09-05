import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: {},
  prefilledSearchData: {},
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setPrefilledSearchData: (state, { payload }) => {
      state.prefilledSearchData = payload;
    },
  },
});

export const { setSearchData, setPrefilledSearchData } = searchSlice.actions;

export default searchSlice.reducer;
