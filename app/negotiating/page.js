'use client';

import { Sidebar } from '@/ui';
import { sidebarData } from '@/utils/mock';

const Negotiating = () => {
  return (
    <div className="h-[calc(100vh-52px-40px)] w-[calc(100vw-256px)] ml-[256px] mt-[50px] bg-gray-light overflow-x-auto">
      <Sidebar data={sidebarData} containerStyles="fixed top-0 left-0 bottom-0" />
    </div>
  );
};

export default Negotiating;
