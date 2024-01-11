'use client';

import { Notification, ProfileMenu } from '@/modules';

export default function AccountHeader() {
  return (
    <header className="w-full shadow-xmd px-5 py-2 flex items-center">
      <div className="flex justify-end w-full items-center">
        <Notification />
        <ProfileMenu />
      </div>
    </header>
  );
}
