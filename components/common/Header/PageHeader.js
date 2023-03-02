'use client';

import ProviderManager from '../ProviderManager';

import profileMock from '@/assets/images/profileMock.png';
import { Notification, ProfileMenu } from '@/ui';

const PageHeader = () => {
  return (
    <ProviderManager>
      <header className="fixed right-0 top-0 h-[52px] w-[calc(100vw-256px)] shadow-xmd px-5 flex items-center">
        <div className="ml-auto flex items-center">
          <Notification numberOfNotifications={20} />
          <ProfileMenu image={profileMock} />
        </div>
      </header>
    </ProviderManager>
  );
};

export default PageHeader;
