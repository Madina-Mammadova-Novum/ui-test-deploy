import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { getRtURL } from '.';
import { getCookieFromBrowser, getSocketConnectionsParams } from './helpers';

import { messageDataAdapter } from '@/adapters';
import {
  messageAlert,
  offlineStatus,
  onlineStatus,
  resetUser,
  setConversation,
  setLoadConversation,
  setOpenedChat,
  setUser,
  typingStatus,
  updateUserConversation,
} from '@/store/entities/chat/slice';
import { fetchNotifications } from '@/store/entities/notifications/actions';

export class SignalRController {
  constructor({ host, state }) {
    this.host = host;
    this.store = state;
    this.connection = null;
  }

  async startConnection({ path, token }) {
    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(path), getSocketConnectionsParams(token))
        .configureLogging(LogLevel.None)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
    } catch (err) {
      this.connection.onclose(async () => {
        await this.refreshTokenAndConnect({ path });
      });
    }
  }

  async refreshTokenAndConnect({ path }) {
    const token = getCookieFromBrowser('session-access-token');

    if (token) {
      await this.startConnection({ path, token });
    } else {
      throw new Error('Failed to refresh token. Connection cannot be established.');
    }
  }

  async setupConnection({ path }) {
    const token = getCookieFromBrowser('session-access-token');

    if (!token) {
      throw new Error('Token is not available. Connection cannot be established.');
    }

    await this.startConnection({ path, token });
  }
}

export class NotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.notificationReceived = false;
  }

  init() {
    this.setupConnection({ path: this.host });
    this.connection.on('ReceiveNotification', (response) => this.recievedNotification({ response }));
  }

  recievedNotification({ response }) {
    if (response && !this.notificationReceived) {
      this.notificationReceived = true;
      this.store.dispatch(fetchNotifications({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
    }
  }

  async stop() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

export class ChatSessionController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
  }

  async init({ chatId }) {
    this.incomingMessage({ chatId, messageCount: 0 });
    await this.setupConnection({ path: `${this.host}/chat?chatId=${chatId}` });

    this.connection.on('ReceiveMessage', (message) => {
      this.connection.invoke('ReadMessage', message.id);
      this.updateMessage({ message });
    });
  }

  sendMessage({ message }) {
    if (message !== '' && this.connection) {
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

  init() {
    this.setupConnection({ path: `${this.host}/chatlist` });

    this.connection.on('ChatIsOnline', (chat) => this.store.dispatch(onlineStatus(chat)));
    this.connection.on('ChatIsOffline', (chat) => this.store.dispatch(offlineStatus(chat)));

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
