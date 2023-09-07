import { store } from '@/store';
import { SignalRService } from '@/utils/signalr';

const signalR = ({ host }) => new SignalRService({ host, state: store });

export const notificationService = signalR({ host: 'hubs/NotificationHub' });
export const chatService = signalR({ host: 'hubs/chat' });
