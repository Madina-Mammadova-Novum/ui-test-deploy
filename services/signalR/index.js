import { store } from '@/store';
import {
  AnonChatController,
  ChatNotificationController,
  ChatSessionController,
  NotificationController,
} from '@/utils/signalr';

const serviceParams = (host) => ({ host, state: store });

/* chat api */
export const сhatSessionService = new ChatSessionController(serviceParams('hubs'));
export const chatNotificationService = new ChatNotificationController(serviceParams('hubs'));
export const chatAnonService = new AnonChatController(serviceParams('hubs'));
/* notifications api */
export const globalNotificationService = new NotificationController(serviceParams('hubs/NotificationHub'));
