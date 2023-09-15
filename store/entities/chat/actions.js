import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */

/* Services */
import { CHAT } from './types';

import { listOfChatsDataAdapter } from '@/adapters';
import { getChatHistoryById, getListOfChatSessions } from '@/services';

export const getListOfChats = createAsyncThunk(CHAT.GET_CHATS, async () => {
  const { data } = await getListOfChatSessions();

  return { data: listOfChatsDataAdapter({ data }) };
});

export const getChatHistory = createAsyncThunk(CHAT.GET_HISTORY, async ({ data }) => {
  const { data: result } = await getChatHistoryById({ data });

  return { data: result?.messages };
});
