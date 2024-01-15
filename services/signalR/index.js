import { store } from '@/store';
import { getCookieFromBrowser } from '@/utils/helpers';
import { ChatNotificationController, ChatSessionController, NotificationController } from '@/utils/signalr';

const token = getCookieFromBrowser('session-access-token');

const serviceParams = (host) => ({ host, state: store, token });

/* chat api */
export const сhatSessionServcie = new ChatSessionController(serviceParams('hubs'));
export const chatNotificationService = new ChatNotificationController(serviceParams('hubs'));
/* notifications api */
export const globalNotificationService = new NotificationController(serviceParams('hubs/NotificationHub'));
