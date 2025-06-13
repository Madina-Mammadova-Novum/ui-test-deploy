'use client';

import dynamic from 'next/dynamic';

import { Notification, ProfileMenu } from '@/modules';
import NotificationSound from '@/modules/NotificationSound';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

export default function AccountHeader() {
  return (
    <InAppChecker>
      <header className="flex w-full items-center bg-white px-5 py-2 shadow-xmd">
        <div className="flex w-full items-center justify-end">
          <NotificationSound />
          <Notification />
          <ProfileMenu />
        </div>
      </header>
    </InAppChecker>
  );
}
