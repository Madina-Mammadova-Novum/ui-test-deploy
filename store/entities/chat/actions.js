import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */

/* Services */
import { CHAT } from './types';

import { helpCenterDataAdapter, listOfChatsDataAdapter } from '@/adapters';
import { getChatHistoryById, getHelpCenterSession, getListOfChatSessions } from '@/services';

export const getListOfChats = createAsyncThunk(CHAT.GET_CHATS, async () => {
  const [{ data: chats }, { data: support }] = await Promise.all([getListOfChatSessions(), getHelpCenterSession()]);

  return { active: listOfChatsDataAdapter({ data: chats }), support: helpCenterDataAdapter({ data: support }) };
});

export const getChatHistory = createAsyncThunk(CHAT.GET_HISTORY, async ({ data }) => {
  const { data: result } = await getChatHistoryById({ data });

  return { data: result?.messages };
});
