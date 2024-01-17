import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { deactivateUserChat, getChatHistory, getListOfChats, reactivateUserChat } from './actions';

import { moreMessagesDataAdapter } from '@/adapters';
import { sortChatMessages } from '@/utils/helpers';

const initialState = {
  loading: false,
  updating: false,
  error: false,
  status: null,
  opened: false,
  isActiveSession: false,
  data: {
    active: [],
    archived: [],
    searched: [],
    collapsed: [],
    support: [],
    user: {
      created: '',
      data: {},
      status: null,
      messages: [],
      loading: false,
      updating: false,
      isLast: false,
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
      const { value, key } = payload;

      const result = state.data[key].filter(({ vessel }) => {
        return (
          vessel.name.includes(value) ||
          vessel.type.includes(value) ||
          vessel.cargoId.includes(value) ||
          vessel.imo.includes(value) ||
          vessel.products.some(({ name }) => name?.includes(value))
        );
      });

      state.data.searched = result;
    },
    setUser: (state, action) => {
      state.data.user.data = action.payload;
    },
    setUpdate: (state, action) => {
      state.updating = action.payload;
    },
    setUserMessages: (state, { payload }) => {
      state.data.user.messages = sortChatMessages(payload);
    },
    updateUserMessages: (state, { payload }) => {
      const updatedData = moreMessagesDataAdapter({ payload, messages: state.data.user.messages });
      state.data.user.messages = sortChatMessages(Object.values(updatedData));
    },
    updateUserConversation: (state, { payload }) => {
      const today = state.data.user.messages.find((message) => message.title === 'Today');

      if (today) today.data = [...today.data, payload];
      else state.data.user.messages.unshift({ title: 'Today', data: [payload] });
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
    resetChatFilter: (state) => {
      state.filterParams = initialState.filterParams;
    },
    resetUser: (state) => {
      state.data.user.data = {};
      state.data.user.messages = [];
    },

    typingStatus: (state, { payload }) => {
      const updatedCollapsedState = state.data.collapsed.map((user) => {
        if (user.contentId === payload.contentId || user.chatId === payload.id) {
          return {
            ...user,
            isTyping: payload?.typing,
          };
        }
        return user;
      });

      const activeSession = state.data.user.data;

      if (activeSession.chatId === payload?.id) {
        activeSession.isTyping = payload?.typing;
      }

      state.data.collapsed = updatedCollapsedState;
    },

    onlineStatus: (state, { payload }) => {
      state.data.active = state.data.active.map((user) => {
        if (user.chatId === payload.id) {
          return {
            ...user,
            isOnline: true,
          };
        }

        return user;
      });
    },

    offlineStatus: (state, { payload }) => {
      state.data.active = state.data.active.map((user) => {
        if (user.chatId === payload.id) {
          return {
            ...user,
            isOnline: false,
          };
        }

        return user;
      });
    },

    messageAlert: (state, { payload }) => {
      const activeSessionId = state.data.user.data?.chatId;

      const updatedActiveState = state.data.active.map((user) => {
        if (user.contentId === payload?.chatId || user.chatId === payload.chatId) {
          return {
            ...user,
            messageCount: activeSessionId === payload?.chatId ? 0 : payload.messageCount,
          };
        }
        return user;
      });

      const updatedCollapsedState = state.data.collapsed.map((user) => {
        if (user.contentId === payload?.chatId || user.chatId === payload.chatId) {
          return {
            ...user,
            messageCount: payload.messageCount,
          };
        }
        return user;
      });

      if (state.data.support[0]?.chatId === payload?.chatId) {
        state.data.support[0].messageCount = activeSessionId === payload?.chatId ? 0 : payload.messageCount;
      }

      state.data.active = updatedActiveState;
      state.data.collapsed = updatedCollapsedState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfChats.pending, (state) => {
      state.loading = true;
      state.updating = false;
    });
    builder.addCase(getListOfChats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.status = payload.status;
      state.updating = payload.updating;
      state.data.active = payload.active;
      state.data.archived = payload.archived;
      state.data.support = payload.support;
    });
    builder.addCase(getListOfChats.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.updating = false;
    });
    builder.addCase(getChatHistory.pending, (state) => {
      state.data.user.loading = state.data.user.messages.length === 0;
      state.data.user.updating = state.data.user.messages.length > 0;
    });
    builder.addCase(getChatHistory.fulfilled, (state, { payload }) => {
      state.data.user.loading = false;
      state.data.user.updating = false;
      state.data.user.created = payload.created;
      state.data.user.isLast = payload.isLast;
      state.data.user.status = payload.status;
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
  setDeactivateConversation,
  setUserMessages,
  updateUserMessages,
  messageAlert,
  typingStatus,
  searchedData,
  resetUser,
  resetChatFilter,
  removeCollapsedChat,
  setLoadConversation,
  updateUserConversation,
  onlineStatus,
  offlineStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
