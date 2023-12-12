import { store } from '@/store';
import {
  AnonChatController,
  ChatNotificationController,
  ChatSessionController,
  NotificationController,
} from '@/utils/signalr';

const serviceParams = (host) => ({ host, state: store });

/* chat api */
export const сhatSessionServcie = new ChatSessionController(serviceParams('hubs'));
export const chatNotificationService = new ChatNotificationController(serviceParams('hubs'));
export const chatAnonService = new AnonChatController(serviceParams('hubs'));
/* notificaton api */
export const notificationService = new NotificationController(serviceParams('hubs/NotificationHub'));
