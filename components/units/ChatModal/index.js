'use client';

import { useMemo } from 'react';

import { ChatControl, ChatList, ChatLoadMoreCta, ChatModalHeader } from '@/units';

const ChatModal = ({ isOpened, onClose }) => {
  const listData = [
    {
      id: 0,
      title: 'Harvey Deep Sea',
      cargoId: 'QW1122',
      isActive: true,
      unreaded: 2,
    },
    {
      id: 1,
      title: 'Opal Fortune',
      cargoId: 'QW1122',
      isActive: false,
      unreaded: null,
    },
    {
      id: 2,
      title: 'Us Gov Vessel John Glenn',
      cargoId: 'QW1122',
      isActive: false,
      unreaded: 3,
    },
  ];
  const printModalContent = useMemo(() => {
    return (
      <div className="absolute bg-white right-24 bottom-6 h-[604px] w-[360px] rounded-base">
        <ChatModalHeader onClose={onClose} />
        <ChatControl activeTab="Active" searchValue="" />
        <ChatList data={listData} />
        <ChatLoadMoreCta getMore={false} />
      </div>
    );
  }, [onClose]);

  return isOpened && printModalContent;
};

ChatModal.propTypes = {};

export default ChatModal;
