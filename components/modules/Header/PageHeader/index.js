import profileMock from '@/assets/images/profileMock.png';
import { Notification, ProfileMenu } from '@/modules';

const PageHeader = () => {
  return (
    <header className="relative right-0 top-0 w-full ml-auto shadow-xmd px-5 flex items-center">
      <div className="flex justify-end w-full items-center py-2">
        <Notification numberOfNotifications={20} />
        <ProfileMenu image={profileMock} />
      </div>
    </header>
  );
};

export default PageHeader;
