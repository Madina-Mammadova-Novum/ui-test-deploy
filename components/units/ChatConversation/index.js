'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { getChatSelector } from '@/store/selectors';

const ChatConversation = ({ onCloseSession, onCollapseSession }) => {
  const {
    chats: { currentUser },
  } = useSelector(getChatSelector);

  const [message, setMessage] = useState('');

  const handleMessage = ({ target: { value } }) => setMessage(value);

  return (
    <div className="fixed bg-white border border-gray-light left-1/3 bottom-6 h-auto w-[360px] rounded-base">
      <СhatConversationHeader data={currentUser} onClose={onCloseSession} onCollapse={onCollapseSession} />
      <div className="flex flex-col min-h-[47vh] p-5">
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

ChatConversation.propTypes = ChatConversationPropTypes;

export default ChatConversation;
