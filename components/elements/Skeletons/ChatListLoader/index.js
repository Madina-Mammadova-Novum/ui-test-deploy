import { Fragment } from 'react';

import { Divider } from '@/elements';

export const ChatListLoader = () => {
  return Array.from({ length: 3 }, (_, index) => (
    <Fragment key={index}>
      {index !== 0 && <Divider />}
      <div key={index} className="flex items-center gap-y-4 space-x-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
        <div className="flex-1">
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-300" />
          <div className="mt-2 h-2 w-2/3 animate-pulse rounded bg-gray-300" />
          <div className="mt-2.5 h-2 w-1/3 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </Fragment>
  ));
};
