import { Fragment } from 'react';

import { Divider } from '@/elements';

export const ChatListLoader = () => {
  return Array.from({ length: 3 }, (_, index) => (
    <Fragment key={index}>
      {index !== 0 && <Divider />}
      <div key={index} className="flex items-center space-x-4 gap-y-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse mt-2" />
          <div className="h-2 w-2/3 bg-gray-300 rounded animate-pulse mt-2" />
          <div className="h-2 w-1/3 bg-gray-300 rounded animate-pulse mt-2.5" />
        </div>
      </div>
    </Fragment>
  ));
};
