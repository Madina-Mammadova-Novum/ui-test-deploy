'use client';

import { ChatTabsPropTypes } from '@/lib/types';

import { Tabs } from '@/units';

const ChatTabs = ({ activeTab, onClick, activeCounter, archivedCounter, containerClass }) => {
  const options = [
    {
      label: `Active (${activeCounter})`,
      value: true,
    },
    {
      label: `Archived (${archivedCounter})`,
      value: false,
    },
  ];

  return (
    <div className={containerClass}>
      <Tabs tabs={options} activeTab={options[0].value ?? activeTab} onClick={onClick} />
    </div>
  );
};

ChatTabs.propTypes = ChatTabsPropTypes;

export default ChatTabs;
