'use client';

import Hydrate from '@/elements/Hydrate';
import { Notification, ProfileMenu } from '@/modules';

export default function AccountHeader() {
  return (
    <header className="w-full shadow-xmd px-5 py-2 flex items-center">
      <div className="flex justify-end w-full items-center">
        <Hydrate>
          <Notification />
        </Hydrate>
        <ProfileMenu />
      </div>
    </header>
  );
}
