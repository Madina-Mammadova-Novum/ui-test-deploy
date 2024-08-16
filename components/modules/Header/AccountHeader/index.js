import { Notification, ProfileMenu } from '@/modules';

export default function AccountHeader() {
  return (
    <header className="flex w-full items-center px-5 py-2 shadow-xmd">
      <div className="flex w-full items-center justify-end">
        <Notification />
        <ProfileMenu />
      </div>
    </header>
  );
}
