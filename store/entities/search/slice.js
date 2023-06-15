import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: {},
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
  },
});

export const { setSearchData } = searchSlice.actions;

export default searchSlice.reducer;
