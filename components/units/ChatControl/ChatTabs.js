'use client';

import { ChatTabsPropTypes } from '@/lib/types';

import { ChatTabLoader } from '@/elements';
import { Tabs } from '@/units';

const ChatTabs = ({ activeTab, onClick, activeCounter = 0, archivedCounter = 0, containerClass, loading }) => {
  const options = [
    {
      label: `Active (${activeCounter})`,
      value: 'active',
    },
    {
      label: `Archived (${archivedCounter})`,
      value: 'archived',
    },
  ];

  return (
    <div className={containerClass}>
      {loading ? <ChatTabLoader /> : <Tabs tabs={options} activeTab={activeTab} onClick={onClick} />}
    </div>
  );
};

ChatTabs.propTypes = ChatTabsPropTypes;

export default ChatTabs;
