import { createSlice } from '@reduxjs/toolkit';
/* Actions */
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  connected: false,
  loading: false,
  error: false,
  data: {
    active: {
      total: 0,
      conversations: [],
    },
    archived: {
      total: 0,
      conversations: [],
    },
  },
  filterParams: {
    searchValue: '',
    tabValue: 'active',
    showMore: false,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatFilter: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
  },
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export const { setChatFilter } = chatSlice.actions;

export default chatSlice.reducer;
