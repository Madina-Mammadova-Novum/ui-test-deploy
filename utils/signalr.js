import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { getSocketConnectionsParams } from './helpers';

import { messagesDataAdapter } from '@/adapters';
import {
  messageAlert,
  resetUser,
  setConversation,
  setLoadConversation,
  setUser,
  setUserConversation,
} from '@/store/entities/chat/slice';
import { setFilterParams } from '@/store/entities/notifications/slice';

export class SignalRController {
  constructor({ host, state }) {
    this.connection = null;
    this.session = null;
    this.store = state;
    this.host = host;
  }

  async setupConnection({ path }) {
    const session = await getSession();

    this.session = session;

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
    this.messages = [];
  }

  async initStatus() {
    await this.setupConnection({ path: `${this.host}/chatlist` });

    this.connection.on('ReceiveMessage', async (response) => {
      this.incomingMessage({ chat: response });
    });
  }

  async initChat({ chatId, vessel }) {
    this.store.dispatch(setLoadConversation(true));
    this.store.dispatch(setConversation(true));
    this.store.dispatch(setUser({ chatId, vessel }));
    this.store.dispatch(setUserConversation([]));

    try {
      await this.setupConnection({ path: `${this.host}/chat?chatId=${chatId}` });
      this.connection.on('ReceiveMessage', async (response) => {
        this.store.dispatch(setLoadConversation(false));
        this.updateMessage({ message: response });
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

  updateMessage({ message }) {
    this.messages.push(message);
    this.getMessages();
  }

  getMessages() {
    const data = messagesDataAdapter({ data: this.messages, session: this.session });
    this.store.dispatch(setUserConversation(data));
  }

  incomingMessage({ chat }) {
    this.store.dispatch(messageAlert(chat));
  }

  disconnect() {
    this.stop();
    this.messages = [];
    this.store.dispatch(resetUser());
    this.store.dispatch(setUserConversation([]));
    this.store.dispatch(setLoadConversation(false));
    this.store.dispatch(setConversation(false));
  }
}
