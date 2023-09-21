import { createSlice } from '@reduxjs/toolkit';
/* Actions */
import { HYDRATE } from 'next-redux-wrapper';

import { getChatHistory, getListOfChats } from './actions';

const initialState = {
  connected: false,
  loading: false,
  error: false,
  opened: false,
  isActiveSession: false,
  isDeactivatedSession: false,
  data: {
    searched: [],
    active: [],
    archived: [],
    collapsed: [],
    user: {
      loading: false,
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
        return (
          vessel.name.includes(payload) ||
          vessel.imo.includes(payload) ||
          vessel.products.some(({ name }) => name?.includes(payload))
        );
      });
    },
    setUser: (state, action) => {
      state.data.user.data = action.payload;
    },
    setUserConversation: (state, { payload }) => {
      state.data.user.messages = payload;
    },
    setCollapsedChat: (state, { payload }) => {
      state.data.collapsed = [...state.data.collapsed, payload];
    },
    removeCollapsedChat: (state, { payload }) => {
      const index = state.data.collapsed.findIndex(({ chatId }) => chatId === payload);
      if (index !== -1) state.data.collapsed.splice(index, 1);
    },
    setChatFilter: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
    setConversation: (state, { payload }) => {
      state.isActiveSession = payload;
    },
    setOpenedChat: (state, { payload }) => {
      state.opened = payload;
    },
    deactivateConversation: (state, { payload }) => {
      state.isDeactivatedSession = payload;
    },
    resetChatFilter: (state) => {
      state.filterParams = initialState.filterParams;
    },
    resetUser: (state) => {
      state.data.user = initialState.data.user;
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
    builder.addCase(getChatHistory.pending, (state) => {
      state.data.user.loading = true;
    });
    builder.addCase(getChatHistory.fulfilled, (state) => {
      state.data.user.loading = false;
    });
    builder.addCase(getChatHistory.rejected, (state) => {
      state.data.user.loading = false;
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

export const {
  setChatFilter,
  setUser,
  resetChatFilter,
  searchedData,
  setUserConversation,
  setCollapsedChat,
  resetUser,
  setConversation,
  deactivateConversation,
  removeCollapsedChat,
  setOpenedChat,
} = chatSlice.actions;

export default chatSlice.reducer;
