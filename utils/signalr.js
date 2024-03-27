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

      this.connection.onclose(() => {
        this.connection.off();
      });
    } catch (err) {
      await this.refreshTokenAndConnect({ path, token });
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

  async setupConnection({ path, token }) {
    if (token) {
      await this.startConnection({ path, token });
    } else {
      throw new Error('Token is not available. Connection cannot be established.');
    }
  }
}

export class NotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.notificationReceived = false;
  }

  async init({ token }) {
    await this.setupConnection({ path: this.host, token });
    this.connection.on('ReceiveNotification', () => this.receiveTrigger());
  }

  receiveTrigger() {
    this.store.dispatch(fetchNotifications({ skip: 0, take: 50, query: '', isOpened: false, origin: null }));
  }

  async stop() {
    if (this.connection?.state === 'Connected') {
      this.connection.stop();
    }
  }
}

export class ChatSessionController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.isOpened = false;
  }

  async init({ chatId, token }) {
    const clientId = getCookieFromBrowser('session-user-id');
    const role = getCookieFromBrowser('session-user-role');

    await this.setupConnection({ path: `${this.host}/chat?chatId=${chatId}`, token });

    this.connection.on('ReceiveMessage', (message) => {
      this.updateMessage({ message, clientId, role, chatId });

      if (this.isOpened) {
        this.readMessage({ id: message.id });
      }
    });
  }

  onToggle(opened) {
    this.store.dispatch(setOpenedChat(opened));
    this.isOpened = opened;
  }

  sendMessage({ message }) {
    if (this.connection?.state === 'Connected') {
      this.connection.invoke('SendMessage', message);
    }
  }

  readMessage({ id }) {
    if (this.connection?.state === 'Connected') {
      this.connection?.invoke('ReadMessage', id);
    }
  }

  updateMessage({ message, clientId, role }) {
    this.store.dispatch(updateUserConversation(messageDataAdapter({ data: message, clientId, role })));
  }

  async stop() {
    this.store.dispatch(setConversation(false));
    this.store.dispatch(setLoadConversation(false));
    this.store.dispatch(resetUser());
    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export class ChatNotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.isOpened = false;
  }

  async init({ token, key }) {
    await this.setupConnection({ path: `${this.host}/chatlist`, token });

    this.connection.on('ChatIsOnline', (chat) => {
      if (chat?.archieved || chat?.deactivated || key === 'archieved') return;
      this.store.dispatch(onlineStatus(chat));
    });

    this.connection.on('ChatIsOffline', (chat) => {
      if (chat?.archieved || chat?.deactivated || key === 'archieved') return;
      this.store.dispatch(offlineStatus(chat));
    });

    this.connection.on('ReceiveMessage', async (chat) => {
      if (chat?.archieved || chat?.deactivated || key === 'archieved') return;

      if (this.isOpened) {
        this.store.dispatch(messageAlert({ chatId: chat.id, messageCount: 0 }));
      } else {
        this.store.dispatch(messageAlert({ chatId: chat.id, messageCount: chat.messageCount }));
      }
    });

    this.connection.on('SomeoneIsTyping', (chat) => {
      if (chat?.archieved || chat?.deactivated) return;

      if (key === 'archieved') {
        this.typingTimeout = setTimeout(() => {
          this.isTyping({ chat, typing: false });
        }, 1200);

        this.isTyping({ chat, typing: true });
        clearTimeout(this.typingTimeout);
      }
    });
  }

  isTyping({ chat, typing }) {
    this.store.dispatch(typingStatus({ ...chat, typing }));
  }

  onToggle(opened) {
    this.isOpened = opened;
  }

  async stop() {
    if (this.connection?.state === 'Connected') {
      await this.connection.stop();
    }
  }
}
