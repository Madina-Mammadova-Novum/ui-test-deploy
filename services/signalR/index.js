import { store } from '@/store';
import { ChatController, NotificationController } from '@/utils/signalr';

export const notificationService = new NotificationController({ host: 'hubs/NotificationHub', state: store });
export const chatListService = new ChatController({ host: 'hubs', state: store });
export const chatService = new ChatController({ host: 'hubs', state: store });
