import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */

/* Services */
import { CHAT } from './types';

import { listOfChatsDataAdapter } from '@/adapters';
import { getListOfChatSessions } from '@/services';

export const getListOfChats = createAsyncThunk(CHAT.GET_CHATS, async () => {
  const { data } = await getListOfChatSessions();

  return { data: listOfChatsDataAdapter({ data }) };
});
