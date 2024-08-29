import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Howl } from 'howler';
import { NotificationHorn } from 'public/sounds';

import { getRtURL } from '.';
import { getCookieFromBrowser, getSocketConnectionsParams } from './helpers';
import { useNotificationToast } from './hooks';

import { messageDataAdapter } from '@/adapters';
import {
  messageAlert,
  offlineStatus,
  onlineStatus,
  setConversation,
  setLoadConversation,
  typingStatus,
  updateUserConversation,
} from '@/store/entities/chat/slice';
import { fetchNotifications } from '@/store/entities/notifications/actions';

import 'react-toastify/dist/ReactToastify.css';

export class SignalRController {
  constructor({ host, state }) {
    this.host = host;
    this.store = state;
    this.connection = null;
    this.isInitialized = false;
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
    this.isInitialized = false;
  }

  async init({ token }) {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    await this.setupConnection({ path: this.host, token });
    this.connection.on('ReceiveNotification', () => this.receiveTrigger());
  }

  receiveTrigger() {
    this.store
      .dispatch(fetchNotifications({ skip: 0, take: 10, query: '', isOpened: false, origin: null }))
      .then(() => {
        const {
          notifications: { unwatchedData },
        } = this.store.getState();

        const newestNotification = unwatchedData?.[0]?.data?.[0] || false;

        const hornSound = new Howl({
          src: NotificationHorn,
          loop: false,
          preload: true,
          autoplay: true,
          volume: 0.7,
        });

        //  TODO: pause case should be added to make horn loop true also mute button should be added
        if (newestNotification) {
          hornSound.play();
          useNotificationToast([newestNotification]);
        }
      });
  }

  async cleanup() {
    if (this.connection) {
      this.connection.off('ReceiveNotification', this.receiveTrigger);
      await this.connection.stop();
      this.isInitialized = false;
    }
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
    this.isOpened = opened;
    this.store.dispatch(setConversation(opened));
  }

  async sendMessage({ message }) {
    this.connection?.invoke('SendMessage', message);
  }

  async readMessage({ id }) {
    this.connection?.invoke('ReadMessage', id);
  }

  updateMessage({ message, clientId, role }) {
    this.store.dispatch(updateUserConversation(messageDataAdapter({ data: message, clientId, role })));
  }

  stop() {
    this.store.dispatch(setConversation(false));
    this.store.dispatch(setLoadConversation(false));

    if (this.connection) {
      this.connection.stop();
    }
  }
}

export class ChatNotificationController extends SignalRController {
  constructor({ host, state }) {
    super({ host, state });
    this.isOpened = false;
  }

  async init({ token }) {
    await this.setupConnection({ path: `${this.host}/chatlist`, token });

    this.connection.on('ChatIsOnline', (chat) => {
      this.store.dispatch(onlineStatus(chat));
    });

    this.connection.on('ChatIsOffline', (chat) => {
      this.store.dispatch(offlineStatus(chat));
    });

    this.connection.on('ReceiveMessage', async (chat) => {
      if (this.isOpened) {
        this.store.dispatch(messageAlert({ chatId: chat.id, messageCount: 0 }));
      } else {
        this.store.dispatch(messageAlert({ chatId: chat.id, messageCount: chat.messageCount }));
      }
    });

    this.connection.on('SomeoneIsTyping', (chat) => {
      if (chat?.id) {
        this.isTyping({ chat, typing: true });
        clearTimeout(this.typingTimeout);

        this.typingTimeout = setTimeout(() => {
          this.isTyping({ chat, typing: false });
        }, 1000);
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
