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
    currentUser: {
      data: {},
      messages: [],
    },
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
      state.data.currentUser.data = action.payload;
    },
    setUserConversation: (state, { payload }) => {
      state.data.currentUser.messages.push(payload);
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
    resetCurrentUser: (state) => {
      state.data.currentUser = initialState.data.currentUser;
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
    builder.addCase(getListOfChats.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export const { setChatFilter, setCurrentUser, resetChatFilter, searchedData, setUserConversation, resetCurrentUser } =
  chatSlice.actions;

export default chatSlice.reducer;
