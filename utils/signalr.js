import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { getRtURL } from '.';
import { getCookieFromBrowser, getSocketConnectionsParams } from './helpers';

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
    this.host = host;
    this.store = state;
    this.connection = null;
  }

  async setupConnection({ path, token }) {
    if (!token) return;

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(path), getSocketConnectionsParams(token))
        .configureLogging(LogLevel.None)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
    } catch (err) {
      this.connection.onreconnecting((error) => console.log(error));
    }
  }
}

export class NotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async init({ token }) {
    if (!token) throw new Error('Unathorized');

    try {
      await this.setupConnection({ path: this.host, token });
      this.connection.on('ReceiveNotification', async (response) => this.recievedNotification({ response }));
    } catch (err) {
      console.log(err);
    }
  }

  recievedNotification({ response }) {
    if (response) {
      this.store.dispatch(setFilterParams({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
    }
  }

  async stop() {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export class ChatSessionController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async initChat({ data, token }) {
    if (!token) throw new Error('Unathorized');

    await this.stop();

    this.store.dispatch(setConversation(true));
    this.store.dispatch(setUser(data));
    this.incomingMessage({ chatId: data?.chatId, messageCount: 0 });

    try {
      await this.setupConnection({ path: `${this.host}/chat?chatId=${data?.chatId}`, token });

      this.connection.on('ReceiveMessage', (message) => {
        this.connection.invoke('ReadMessage', message.id);
        this.updateMessage({ message });
      });
    } catch (err) {
      console.log(err);
    }
  }

  sendMessage({ message }) {
    if (message !== '') {
      this.connection.invoke('SendMessage', message);
    }
  }

  updateMessage({ message }) {
    const clientId = getCookieFromBrowser('session-user-id');
    const role = getCookieFromBrowser('session-user-role');
    this.store.dispatch(updateUserConversation(messageDataAdapter({ data: message, clientId, role })));
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

  async init({ token }) {
    if (!token) throw new Error('Unathorized');

    await this.setupConnection({ path: `${this.host}/chatlist`, token });

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
