import { store } from '@/store';
import { ChatNotificationController, ChatSessionController, NotificationController } from '@/utils/signalr';

const serviceParams = (host) => ({ host, state: store });

/* chat api */
export const сhatSessionServcie = new ChatSessionController(serviceParams('hubs'));
export const chatNotificationService = new ChatNotificationController(serviceParams('hubs'));
/* notificaton api */
export const notificationService = new NotificationController(serviceParams('hubs/NotificationHub'));
