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
    support: [],
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
      const { value, key } = payload;

      const result = state.data[key].filter(({ vessel }) => {
        return (
          vessel.name.includes(value) ||
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
    updateUserConversation: (state, { payload }) => {
      const today = state.data.user.messages.find((message) => message.title === 'Today');

      if (today) today.data.push(payload);
      else state.data.user.messages.push({ title: 'Today', data: [payload] });
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
      if (state.data.support[0]?.chatId === payload?.id) {
        const updatedMessage = {
          ...state.data.support[0],
          messageCount: payload.messageCount,
        };

        state.data.support[0] = updatedMessage;
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

      const updatedCollapsedState = state.data.collapsed.map((user) => {
        if (user.contentId === payload?.contentId) {
          return {
            ...user,
            messageCount: payload.messageCount,
          };
        }
        return user;
      });

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
      state.data.user.loading = true;
    });
    builder.addCase(getChatHistory.fulfilled, (state, { payload }) => {
      state.data.user.loading = false;
      state.data.user.messages = payload;
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
  messageAlert,
  typingStatus,
  searchedData,
  resetUser,
  resetChatFilter,
  removeCollapsedChat,
  setLoadConversation,
  updateUserConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
