import { HubConnectionBuilder } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { messageResponseAdapter } from '@/adapters';
import { store } from '@/store';
import { setUserConversation } from '@/store/entities/chat/slice';
import { getRtURL } from '@/utils';
import { getData } from '@/utils/dataFetching';
import { getSocketConnectionsParams } from '@/utils/helpers';

export const getListOfChatSessions = async () => {
  const response = await getData(`get-user-chat`);

  return {
    ...response,
  };
};

class ChatService {
  constructor({ host, state }) {
    this.connection = null;
    this.isConnected = false;
    this.store = state;
    this.host = host;
  }

  async startConnection(chatId) {
    const session = await getSession();

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(`${this.host}?chatId=${chatId}`), getSocketConnectionsParams(session?.accessToken))
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.isConnected = true;
      this.connection.on('ReceiveMessage', async (response) => {
        const message = await messageResponseAdapter({ data: response, clientId: session?.userId });
        this.updateMessage(message);
      });
    } catch (err) {
      console.error(err);
      this.isConnected = false;
    }
  }

  async stopConnection() {
    try {
      await this.connection.stop();
      this.isConnected = false;
    } catch (err) {
      console.error(err);
    }
  }

  async sendMessage(message) {
    try {
      await this.connection.invoke('SendMessage', message);
    } catch (e) {
      console.error(e);
    }
  }

  updateMessage(message) {
    const { messages } = this.store.getState().chat.data.currentUser;
    const isMessageAlreadyExists = messages.some((msg) => msg.id === message.id);
    if (!isMessageAlreadyExists) {
      this.store.dispatch(setUserConversation(message));
    }
  }
}

const chatService = new ChatService({ host: 'hubs/chat', state: store });

export default chatService;
