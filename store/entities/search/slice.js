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
      const parsedState = JSON.parse(JSON.stringify({ ...state, searchData: payload }));
      state.prefilledSearchData = parsedState.prefilledSearchData;
      state.searchData = parsedState.searchData;
    },
    setPrefilledSearchData: (state, { payload }) => {
      state.prefilledSearchData = payload;
    },
  },
});

export const { setSearchData, setPrefilledSearchData } = searchSlice.actions;

export default searchSlice.reducer;
