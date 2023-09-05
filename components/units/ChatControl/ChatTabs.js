'use client';

import { ChatTabsPropTypes } from '@/lib/types';

import { Tabs } from '@/units';

const ChatTabs = ({ activeTab, onClick, activeCounter, archivedCounter, containerClass }) => {
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
      <Tabs tabs={options} activeTab={activeTab} onClick={onClick} />
    </div>
  );
};

ChatTabs.propTypes = ChatTabsPropTypes;

export default ChatTabs;
