import { store } from '@/store';
import { ChatNotificationController, ChatSessionController, NotificationController } from '@/utils/signalr';

const serviceParams = (host) => ({ host, state: store });

/* chat api */
export const сhatSessionService = new ChatSessionController(serviceParams('hubs'));
export const chatNotificationService = new ChatNotificationController(serviceParams('hubs'));
/* notifications api */
export const globalNotificationService = new NotificationController(serviceParams('hubs/NotificationHub'));
