/* eslint-disable class-methods-use-this */
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
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

  setupConnection({ path, token }) {
    return new HubConnectionBuilder()
      .withUrl(getRtURL(path), getSocketConnectionsParams(token))
      .configureLogging(LogLevel.None)
      .withAutomaticReconnect()
      .build();
  }

  async initNotifications() {
    try {
      const session = await getSession();

      this.connection = this.setupConnection({ path: this.host, token: session?.accessToken });

      await this.connection.start();

      this.connection.on('ReceiveNotification', async (notification) => {
        if (notification)
          this.store.dispatch(setFilterParams({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
      });
    } catch (err) {
      console.error(err);
    }
  }

  async initChat({ chatId }) {
    try {
      const session = await getSession();

      this.connection = this.setupConnection({ path: `${this.host}?chatId=${chatId}`, token: session?.accessToken });

      await this.connection.start();

      this.connection.on('ReceiveMessage', async (response) => {
        const message = await messageResponseAdapter({ data: response, clientId: session?.userId });
        this.updateChatMessage({ message });
      });
    } catch (err) {
      console.error(err);
    }
  }

  async sendMessage({ message }) {
    try {
      await this.connection.invoke('SendMessage', message);
    } catch (e) {
      console.error(e);
    }
  }

  updateChatMessage({ message }) {
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
