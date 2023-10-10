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
    active: [],
    archived: [],
    searched: [],
    collapsed: [],
    support: {
      chatId: null,
      created: null,
      broker: null,
      unreadedMessages: 0,
    },
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
    setDeactivateConversation: (state, { payload }) => {
      state.isDeactivatedSession = payload;
    },
    resetChatFilter: (state) => {
      state.filterParams = initialState.filterParams;
    },
    resetUser: (state) => {
      state.data.user = initialState.data.user;
    },
    messageAlert: (state, { payload }) => {
      const updatedState = state.data.active.map((user) => {
        if (user.contentId === payload.contentId) {
          return {
            ...user,
            messageCount: payload.messageCount,
          };
        }
        return user;
      });
      state.data.active = updatedState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListOfChats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.active = payload.active;
      state.data.support = payload.support;
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
  setUser,
  setChatFilter,
  setOpenedChat,
  setConversation,
  setCollapsedChat,
  setUserConversation,
  setDeactivateConversation,
  messageAlert,
  searchedData,
  resetUser,
  resetChatFilter,
  removeCollapsedChat,
} = chatSlice.actions;

export default chatSlice.reducer;
