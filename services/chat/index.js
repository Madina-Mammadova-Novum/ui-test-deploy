import { getData, postData } from '@/utils/dataFetching';

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

export const getHelpCenterSession = async () => {
  const response = await getData('chat/help-center');

  return {
    ...response,
  };
};

export const deactivateChatById = async ({ data }) => {
  const body = { data };

  const response = await postData(`chat/deactivate?chatId=${data}`, body);

  return {
    ...response,
  };
};

export const reactivateChatById = async ({ data }) => {
  const body = { data };

  const response = await postData(`chat/reactivate?chatId=${data}`, body);

  return {
    ...response,
  };
};
