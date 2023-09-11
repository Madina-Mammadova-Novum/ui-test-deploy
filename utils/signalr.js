import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { getSocketConnectionsParams } from './helpers';

import { messageResponseAdapter } from '@/adapters';
import { setUserConversation } from '@/store/entities/chat/slice';
import { setFilterParams } from '@/store/entities/notifications/slice';

export class SignalRController {
  constructor({ host, state }) {
    this.connection = null;
    this.store = state;
    this.host = host;
  }

  async setupConnection({ path }) {
    const session = await getSession();

    this.connection = new HubConnectionBuilder()
      .withUrl(getRtURL(path), getSocketConnectionsParams(session?.accessToken))
      .configureLogging(LogLevel.None)
      .withAutomaticReconnect()
      .build();

    await this.connection.start();
  }

  async stop() {
    try {
      await this.connection.stop();
    } catch (err) {
      console.error(err);
    }
  }
}

export class NotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async initNotifications() {
    try {
      await this.setupConnection({ path: this.host });
      this.connection.on('ReceiveNotification', async (response) => this.recievedNotification({ response }));
    } catch (err) {
      console.error(err);
    }
  }

  async recievedNotification({ response }) {
    if (response)
      this.store.dispatch(setFilterParams({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
  }
}

export class ChatController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async initChat({ chatId }) {
    try {
      await this.setupConnection({ path: `${this.host}?chatId=${chatId}` });

      this.connection.on('ReceiveMessage', async (response) => this.recievedMessage({ response }));
    } catch (err) {
      console.error(err);
    }
  }

  async recievedMessage({ response }) {
    const message = await messageResponseAdapter({ data: response });
    this.updateMessage({ message });
  }

  async sendMessage({ message }) {
    try {
      await this.connection.invoke('SendMessage', message);
    } catch (e) {
      console.error(e);
    }
  }

  updateMessage({ message }) {
    const { messages } = this.store.getState().chat.data.user;
    const isMessageAlreadyExists = messages.some((msg) => msg.id === message.id);

    if (!isMessageAlreadyExists) this.store.dispatch(setUserConversation(message));
  }
}
