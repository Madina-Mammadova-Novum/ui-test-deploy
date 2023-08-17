'use client';

import ChatSearch from './ChatSearch';
import ChatSupport from './ChatSupport';
import ChatTabs from './ChatTabs';

const ChatControl = () => {
  return (
    <div className="flex flex-col gap-y-3 px-4 pt-5 pb-3">
      <ChatTabs
        activeCounter={0}
        archivedCounter={0}
        activeTab="Active"
        searchValue=""
        onClick={() => {}}
        containerClass="flex justify-center"
      />
      <ChatSearch value="" onChange={() => {}} />
      <ChatSupport title="Help Center" description="Do you have any problems?" />
    </div>
  );
};

export default ChatControl;
