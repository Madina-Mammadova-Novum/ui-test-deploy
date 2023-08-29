import { createSlice } from '@reduxjs/toolkit';
/* Actions */
import { HYDRATE } from 'next-redux-wrapper';

import { getListOfChats } from './actions';

const initialState = {
  connected: false,
  loading: false,
  error: false,
  data: {
    searched: [],
    active: [],
    archived: [],
    currentUser: {},
  },
  filterParams: {
    searchValue: '',
    tabValue: 'active',
    limit: 3,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    searchedData: (state, { payload }) => {
      state.data.searched = state.data.active.filter(({ vessel }) => {
        return vessel?.name?.includes(payload) || vessel?.imo?.includes(payload) || vessel?.type?.includes(payload);
      });
    },
    setCurrentUser: (state, action) => {
      state.data.currentUser = action.payload;
    },
    setChatFilter: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
    resetChatFilter: (state) => {
      state.filterParams = initialState.filterParams;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListOfChats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.active = payload.data;
    });
  },
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export const { setChatFilter, setCurrentUser, resetChatFilter, searchedData } = chatSlice.actions;

export default chatSlice.reducer;
