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
  setOpenedChat,
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

  async setupConnection({ path, data }) {
    const session = await getSession();

    this.session = data ?? session;

    this.connection = new HubConnectionBuilder()
      .withUrl(getRtURL(path), getSocketConnectionsParams(this.session?.accessToken))
      .configureLogging(LogLevel.None)
      .withAutomaticReconnect()
      .build();

    await this.connection.start();
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

  async stop() {
    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export class ChatSessionController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.messages = [];
  }

  async initChat(data) {
    await this.stop();

    this.store.dispatch(setConversation(true));
    this.store.dispatch(setUser(data));

    this.incomingMessage({ chatId: data?.chatId, messageCount: 0 });

    await this.setupConnection({ path: `${this.host}/chat?chatId=${data?.chatId}` });

    this.connection.on('ReceiveMessage', (message) => {
      this.connection.invoke('ReadMessage', message.id);
      this.updateMessage({ message });
    });
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

  async stop() {
    this.store.dispatch(resetUser());
    this.store.dispatch(setConversation(false));
    this.store.dispatch(setLoadConversation(false));

    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export class ChatNotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async initStatus({ session }) {
    await this.setupConnection({ path: `${this.host}/chatlist`, data: session });

    this.connection.on('ReceiveMessage', (chat) => {
      this.incomingMessage({ chatId: chat.id, messageCount: chat.messageCount });
    });

    this.connection.on('SomeoneIsTyping', (chat) => {
      if (chat.id) {
        this.isTyping({ chat, typing: true });
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.isTyping({ chat, typing: false });
        }, 500);
      }
    });
  }

  onTypingTimeout({ chat }) {
    this.isTyping({ chat, typing: false });
  }

  incomingMessage({ chatId, messageCount }) {
    this.store.dispatch(messageAlert({ chatId, messageCount }));
  }

  isTyping({ chat, typing }) {
    this.store.dispatch(typingStatus({ ...chat, typing }));
  }

  async stop() {
    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export class AnonChatController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async initChat({ data, session }) {
    this.store.dispatch(setUser(data));

    await this.setupConnection({ path: `${this.host}/chat?chatId=${data?.chatId}`, data: session });

    this.connection.on('ReceiveMessage', (message) => {
      this.connection.invoke('ReadMessage', message.id);
      this.updateMessage({ message });
    });
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

  async stop() {
    this.store.dispatch(setOpenedChat(false));

    if (this.connection) {
      await this.connection.stop();
    }
  }
}
