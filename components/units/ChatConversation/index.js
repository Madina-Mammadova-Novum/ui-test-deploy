'use client';

import { useState } from 'react';

import СhatConversationHeader from './СhatConversationHeader';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { makeId } from '@/utils/helpers';

const ChatConversation = () => {
  const [message, setMessage] = useState('');

  const handleMessage = ({ target: { value } }) => setMessage(value);

  const headerData = {
    id: makeId(),
    title: 'Harvey Deep Sea',
    cargoId: 'QW1122',
    isActive: true,
    unreaded: 2,
  };

  return (
    <div className="absolute bg-white border border-gray-light -left-96 top-0 h-auto w-[360px] rounded-base">
      <СhatConversationHeader data={headerData} />
      <div className="flex flex-col min-h-[54vh] p-5">
        <div className="flex w-full grow items-end gap-x-2.5">
          <Input
            type="text"
            value={message}
            onChange={handleMessage}
            placeholder="Message ..."
            customStyles="!border-gray-darker !w-full"
          />
          <Button
            onClick={() => {}}
            customStyles="border border-gray-darker !p-2.5"
            buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
