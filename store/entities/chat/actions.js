import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { CHAT } from './types';

/* Services */
import { helpCenterDataAdapter, listOfChatsDataAdapter } from '@/adapters';
import { deactivateChatById, getChatHistoryById, getHelpCenterSession, getListOfChatSessions } from '@/services';

export const getListOfChats = createAsyncThunk(CHAT.GET_CHATS, async () => {
  const [{ data: chats }, { data: support }] = await Promise.all([getListOfChatSessions(), getHelpCenterSession()]);

  const activeChats = chats.filter(({ chat }) => !chat.archieved);
  const archivedChats = chats.filter(({ chat }) => chat.archieved);

  return {
    active: listOfChatsDataAdapter({ data: activeChats }),
    archived: listOfChatsDataAdapter({ data: archivedChats }),
    support: helpCenterDataAdapter({ data: support }),
  };
});

export const getChatHistory = createAsyncThunk(CHAT.GET_HISTORY, async ({ data }) => {
  const { data: result } = await getChatHistoryById({ data });

  return { data: result?.messages };
});

export const deactivateUserChat = createAsyncThunk(CHAT.DEACTIVATE_BY_ID, async ({ data }, { dispatch }) => {
  const { status } = await deactivateChatById({ data });

  if (status === 200) dispatch(getListOfChats());
});
