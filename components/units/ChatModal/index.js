'use client';

import { useMemo } from 'react';

import { Divider } from '@/elements';
import { ChatControl, ChatList, ChatLoadMoreCta, ChatModalHeader } from '@/units';
import { makeId } from '@/utils/helpers';

const ChatModal = ({ isOpened, onClose }) => {
  const listData = [
    {
      id: makeId(),
      title: 'Harvey Deep Sea',
      cargoId: 'QW1122',
      isActive: true,
      unreaded: 2,
      additional: {
        port: 'Barcelona, ESBCN',
        laycan: 'Dec 18, 2021 to Dec 30, 2021',
        quantity: '24,118 tons',
        products: [
          {
            id: makeId(),
            name: 'Light Crude Oil',
          },
          {
            id: makeId(),
            name: 'Medium Crude Oil',
          },
        ],
      },
    },
    {
      id: makeId(),
      title: 'Opal Fortune',
      cargoId: 'QW1122',
      isActive: false,
      unreaded: null,
      additional: {
        port: 'Barcelona, ESBCN',
        laycan: 'Dec 18, 2021 to Dec 30, 2021',
        quantity: '24,118 tons',
        products: [
          {
            id: makeId(),
            name: 'Light Crude Oil',
          },
          {
            id: makeId(),
            name: 'Medium Crude Oil',
          },
        ],
      },
    },
    {
      id: makeId(),
      title: 'Us Gov Vessel John Glenn',
      cargoId: 'QW1122',
      isActive: false,
      unreaded: 3,
      additional: {
        port: 'Barcelona, ESBCN',
        laycan: 'Dec 18, 2021 to Dec 30, 2021',
        quantity: '24,118 tons',
        products: [
          {
            id: makeId(),
            name: 'Light Crude Oil',
          },
          {
            id: makeId(),
            name: 'Medium Crude Oil',
          },
        ],
      },
    },
  ];
  const printModalContent = useMemo(() => {
    return (
      <div className="absolute bg-white border border-gray-light right-24 bottom-6 h-auto w-[360px] rounded-base">
        <ChatModalHeader onClose={onClose} />
        <ChatControl activeTab="Active" searchValue="" />
        <Divider />
        <ChatList data={listData} />
        <ChatLoadMoreCta getMore={false} />
      </div>
    );
  }, [onClose]);

  return isOpened && printModalContent;
};

ChatModal.propTypes = {};

export default ChatModal;
