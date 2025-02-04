import { Notification, ProfileMenu } from '@/modules';
import NotificationSound from '@/modules/NotificationSound';

export default function AccountHeader() {
  return (
    <header className="flex w-full items-center px-5 py-2 shadow-xmd">
      <div className="flex w-full items-center justify-end">
        <NotificationSound />
        <Notification />
        <ProfileMenu />
      </div>
    </header>
  );
}
