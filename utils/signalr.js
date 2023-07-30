import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { getSession } from 'next-auth/react';

import { store } from '@/store';
import { setConnectionStatus } from '@/store/entities/notifications/slice';

class SignalRService {
  constructor(state) {
    this.connection = null;
    this.isConnected = false;
    this.store = state;
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
        .withUrl(`${process.env.NEXT_PUBLIC_RT_URL}/hubs/NotificationHub`, connectionParams)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.isConnected = true;
      this.store.dispatch(setConnectionStatus(this.isConnected));

      this.connection.on('ReceiveNotification', () => {
        // TODO: setting recieved data to store
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
      await this.connection.invoke('SendNotificationModel', message);
    } catch (err) {
      console.error(err);
    }
  }
}

const signalRService = new SignalRService(store);

export default signalRService;
