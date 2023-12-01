import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { getSocketConnectionsParams } from './helpers';

import { messageDataAdapter } from '@/adapters';
import {
  messageAlert,
  resetUser,
  setConversation,
  setLoadConversation,
  setUser,
  typingStatus,
  updateUserConversation,
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
    // console.log(this.connection, 'con-start');
  }

  async stop() {
    try {
      await this.connection.stop();
      // console.log(this.connection, 'con-stop');
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
  constructor({ host, state, token }) {
    super({ host, state, token });
    this.messages = [];
    this.opened = false;
  }

  async initChat(data) {
    this.store.dispatch(setConversation(true));
    this.store.dispatch(setUser(data));
    this.incomingMessage({ chatId: data?.chatId, messageCount: 0 });

    try {
      await this.setupConnection({ path: `${this.host}/chat?chatId=${data?.chatId}` });
      this.opened = true;

      this.connection.on('ReceiveMessage', (message) => {
        this.incomingMessage({ chatId: data.chatId, messageCount: 0 });
        this.updateMessage({ message });
        this.connection.invoke('ReadMessage', message.id);
      });
    } catch (err) {
      console.error(err);
      this.disconnect();
    }
  }

  async initStatus() {
    await this.setupConnection({ path: `${this.host}/chatlist` });

    this.connection.on('ReceiveMessage', (chat) => {
      if (!this.opened) this.incomingMessage({ chatId: chat.id, messageCount: chat.messageCount });
    });
    // this.connection.on('ChatIsOnline', (chat) => console.log(chat));
    this.connection.on('SomeoneIsTyping', (chat) => this.isTyping({ chat }));
  }

  sendMessage({ message }) {
    if (message !== '') this.connection.invoke('SendMessage', message);
  }

  updateMessage({ message }) {
    this.store.dispatch(updateUserConversation(messageDataAdapter({ data: message, session: this.session })));
  }

  incomingMessage({ chatId, messageCount }) {
    this.store.dispatch(messageAlert({ chatId, messageCount }));
  }

  isTyping({ chat }) {
    this.store.dispatch(typingStatus(chat));
  }

  disconnect() {
    this.stop();
    this.store.dispatch(resetUser());
    this.store.dispatch(setConversation(false));
    this.store.dispatch(setLoadConversation(false));
  }
}
