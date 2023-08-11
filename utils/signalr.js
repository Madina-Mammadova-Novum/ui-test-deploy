import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { successToast } from './hooks';

import { store } from '@/store';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { setConnectionStatus } from '@/store/entities/notifications/slice';

class NotificationService {
  constructor({ host, state }) {
    this.connection = null;
    this.isConnected = false;
    this.store = state;
    this.host = host;
  }

  async start() {
    const session = await getSession();

    const connectionParams = {
      accessTokenFactory: () => `${session?.accessToken}`,
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    };

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(this.host), connectionParams)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.isConnected = true;
      this.store.dispatch(setConnectionStatus(this.isConnected));

      this.connection.on('ReceiveNotification', async (message) => {
        successToast(message?.title);
        this.store.dispatch(
          fetchNotifications({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false })
        );
      });
    } catch (err) {
      console.error(err);
      this.isConnected = false;
      this.store.dispatch(setConnectionStatus(this.isConnected));
    }
  }

  async stop() {
    try {
      await this.connection.stop();
      this.isConnected = false;
      this.store.dispatch(setConnectionStatus(this.isConnected));
    } catch (err) {
      console.error(err);
    }
  }

  async sendMessage(message) {
    try {
      await this.connection.invoke('url/path', message); // TODO: implement chat logic by example
    } catch (err) {
      console.error(err);
    }
  }
}

const notificationService = new NotificationService({ host: 'hubs/NotificationHub', state: store });

export default notificationService;
