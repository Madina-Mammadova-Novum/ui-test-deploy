import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */

// eslint-disable-next-line import/no-cycle
import { setUpdate } from './slice';
import { CHAT } from './types';

/* Services */
import { helpCenterDataAdapter, listOfChatsDataAdapter } from '@/adapters';
import {
  deactivateChatById,
  getChatHistoryById,
  getHelpCenterSession,
  getListOfChatSessions,
  reactivateChatById,
} from '@/services';

export const getListOfChats = createAsyncThunk(CHAT.GET_CHATS, async (_, { dispatch }) => {
  const [{ data: chats }, { data: support }] = await Promise.all([getListOfChatSessions(), getHelpCenterSession()]);

  dispatch(setUpdate(true));

  const activeChats = chats?.filter(({ chat }) => !chat.archieved);
  const archivedChats = chats?.filter(({ chat }) => chat.archieved);

  return {
    active: listOfChatsDataAdapter({ data: activeChats }),
    archived: listOfChatsDataAdapter({ data: archivedChats }),
    support: helpCenterDataAdapter({ data: support }),
    updating: false,
  };
});

export const getChatHistory = createAsyncThunk(CHAT.GET_HISTORY, async ({ data }) => {
  const { data: result } = await getChatHistoryById({ data });

  return { data: result?.messages };
});

export const deactivateUserChat = createAsyncThunk(CHAT.DEACTIVATE, async ({ data }, { dispatch }) => {
  const { status } = await deactivateChatById({ data });

  if (status === 200) {
    dispatch(getListOfChats());
  }
});

export const reactivateUserChat = createAsyncThunk(CHAT.REACTIVATE, async ({ data }, { dispatch }) => {
  const { status } = await reactivateChatById({ data });

  if (status === 200) {
    dispatch(getListOfChats());
  }
});
