import { chatTokenAdapter } from '@/adapters';
import { getData, postData } from '@/utils/dataFetching';

export const getListOfChatSessions = async () => {
  const response = await getData(`get-user-chat`);

  return {
    ...response,
  };
};

export const getChatHistoryById = async ({ data }) => {
  const endpoint = data?.date ? `chat/history?id=${data?.id}&date=${data?.date}` : `chat/history?id=${data?.id}`;

  const response = await getData(endpoint);

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

export const getChatToken = async ({ data }) => {
  const updatedData = { ...data, clientId: 'shiplink-api', clientSecret: '49C1A7E1-0C79-4A7889-Ay3D6-0997998FB86B0' };
  const body = chatTokenAdapter({ updatedData });

  const response = await postData('chat/token', body);

  return { ...response };
};
