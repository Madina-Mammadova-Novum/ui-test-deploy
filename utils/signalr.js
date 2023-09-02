import { HubConnectionBuilder } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { getRtURL } from '.';
import { getSocketConnectionsParams } from './helpers';

import { store } from '@/store';
import { setConnectionStatus, setFilterParams } from '@/store/entities/notifications/slice';

class NotificationService {
  constructor({ host, state }) {
    this.connection = null;
    this.isConnected = false;
    this.store = state;
    this.host = host;
  }

  async start() {
    const session = await getSession();

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(getRtURL(this.host), getSocketConnectionsParams(session?.accessToken))
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.isConnected = true;
      this.store.dispatch(setConnectionStatus(this.isConnected));

      this.connection.on('ReceiveNotification', async (message) => {
        if (message) {
          this.store.dispatch(setFilterParams({ searchValue: '', sortedValue: '', skip: 0, take: 50, watched: false }));
        }
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
}

const notificationService = new NotificationService({ host: 'hubs/NotificationHub', state: store });

export default notificationService;
