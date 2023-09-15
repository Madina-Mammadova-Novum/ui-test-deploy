import { getData } from '@/utils/dataFetching';

export const getListOfChatSessions = async () => {
  const response = await getData(`get-user-chat`);

  return {
    ...response,
  };
};

export const getChatHistoryById = async ({ data }) => {
  const response = await getData(`chat/history?id=${data?.id}&date=${data?.date}`);

  return {
    ...response,
  };
};
