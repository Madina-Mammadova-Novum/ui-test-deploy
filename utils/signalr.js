import { HubConnectionBuilder } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { getSocketConnectionsParams } from './helpers';

import { messageResponseAdapter } from '@/adapters';
import { setUserConversation } from '@/store/entities/chat/slice';
import { setFilterParams } from '@/store/entities/notifications/slice';

export class SignalRService {
  constructor({ host, state }) {
    this.connection = null;
    this.store = state;
    this.host = host;
  }

  async initNotifications() {
    const session = await getSession();

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(this.host), getSocketConnectionsParams(session?.accessToken))
        .withAutomaticReconnect()
        .build();

      await this.connection.start();

      this.connection.on('ReceiveNotification', async (notification) => {
        if (notification)
          this.store.dispatch(setFilterParams({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
      });
    } catch (err) {
      console.error(err);
    }
  }

  async initChat(chatId) {
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

    if (!isMessageAlreadyExists) this.store.dispatch(setUserConversation(message));
  }

  async stop() {
    try {
      await this.connection.stop();
    } catch (err) {
      console.error(err);
    }
  }
}
