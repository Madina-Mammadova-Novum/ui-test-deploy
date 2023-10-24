import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { deactivateUserChat, getChatHistory, getListOfChats, reactivateUserChat } from './actions';

const initialState = {
  loading: false,
  updating: false,
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
      const result = state.data.active.filter(
        ({ vessel }) =>
          vessel.name.includes(payload) ||
          vessel.imo.includes(payload) ||
          vessel.products.some(({ name }) => name?.includes(payload))
      );

      state.data.searched = result;
    },
    setUser: (state, action) => {
      state.data.user.data = action.payload;
    },
    setUpdate: (state, action) => {
      state.updating = action.payload;
    },
    setUserConversation: (state, { payload }) => {
      state.data.user.messages = payload;
    },
    setLoadConversation: (state, { payload }) => {
      state.data.user.loading = payload;
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

    typingStatus: (state, { payload }) => {
      const updatedActiveState = state.data.active.map((user) => {
        if (user.contentId === payload.contentId) {
          return {
            ...user,
            isTyping: true,
          };
        }
        return user;
      });

      state.data.active = updatedActiveState;
    },

    messageAlert: (state, { payload }) => {
      if (state.data.support.chatId === payload?.id) {
        const updatedMessage = {
          ...state.data.support,
          unreadedMessages: payload.messageCount,
        };

        state.data.support = updatedMessage;
      }

      const updatedActiveState = state.data.active.map((user) => {
        if (user.contentId === payload?.contentId) {
          return {
            ...user,
            messageCount: payload.messageCount,
          };
        }
        return user;
      });

      state.data.active = updatedActiveState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListOfChats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.updating = payload.updating;
      state.data.active = payload.active;
      state.data.archived = payload.archived;
      state.data.support = payload.support;
    });
    builder.addCase(getListOfChats.rejected, (state) => {
      state.loading = false;
      state.error = true;
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
    builder.addCase(deactivateUserChat.pending, (state) => {
      state.updating = true;
      state.loading = false;
    });
    builder.addCase(deactivateUserChat.fulfilled, (state) => {
      state.updating = false;
      state.loading = false;
    });
    builder.addCase(reactivateUserChat.pending, (state) => {
      state.updating = true;
      state.loading = false;
    });
    builder.addCase(reactivateUserChat.fulfilled, (state) => {
      state.updating = false;
      state.loading = false;
    });
  },
});

export const {
  setUser,
  setChatFilter,
  setOpenedChat,
  setUpdate,
  setConversation,
  setCollapsedChat,
  setUserConversation,
  setDeactivateConversation,
  messageAlert,
  typingStatus,
  searchedData,
  resetUser,
  resetChatFilter,
  removeCollapsedChat,
  setLoadConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
