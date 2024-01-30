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
      const updatedState = { ...state, searchData: payload };
      state.prefilledSearchData = updatedState.prefilledSearchData;
      state.searchData = updatedState.searchData;
    },
    setPrefilledSearchData: (state, { payload }) => {
      state.prefilledSearchData = payload;
    },
  },
});

export const { setSearchData, setPrefilledSearchData } = searchSlice.actions;

export default searchSlice.reducer;
