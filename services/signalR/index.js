import { getStore } from '@/store';
import { ChatController, NotificationController } from '@/utils/signalr';

export const notificationService = new NotificationController({
  host: 'hubs/NotificationHub',
  state: getStore().store,
});

export const chatService = new ChatController({ host: 'hubs', state: getStore().store });
