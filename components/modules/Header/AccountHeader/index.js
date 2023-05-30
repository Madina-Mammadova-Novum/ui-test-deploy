import { Notification, ProfileMenu } from '@/modules';

const AccountHeader = () => {
  return (
    <header className="w-full shadow-xmd px-5 py-2 flex items-center">
      <div className="flex justify-end w-full items-center">
        <Notification numberOfNotifications={20} />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default AccountHeader;
