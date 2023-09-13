'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ChatConversationBody from './ChatConversationBody';
import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { chatService } from '@/services/signalR';
import { getChatSelector } from '@/store/selectors';

const ChatConversation = ({ onCloseSession, onCollapseSession }) => {
  const { chats } = useSelector(getChatSelector);

  const { data, messages } = chats?.user;

  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chatService?.initChat({ chatId: data?.chatId });
  }, [data?.chatId]);

  useEffect(() => {
    if (message !== '') setDisabled(false);
    else setDisabled(true);
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    chatService?.sendMessage({ message });
    setMessage('');
  };

  const handleMessage = ({ target: { value } }) => setMessage(value);

  const handleEnter = ({ charCode }) => {
    if (charCode === 13) handleSubmit();
  };

  const handleClose = () => {
    chatService?.stop();
    onCloseSession();
  };

  return (
    <div className="absolute bg-white border shadow-xmd border-gray-light -left-[370px] -top-44 h-auto w-[360px] rounded-base">
      <СhatConversationHeader data={data} onClose={handleClose} onCollapse={onCollapseSession} />
      <div className="flex flex-col h-[47vh] p-5">
        <ChatConversationBody messages={messages} />
        <form className="flex w-full grow items-end gap-x-2.5" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={message}
            onChange={handleMessage}
            onKeyPress={handleEnter}
            placeholder="Message ..."
            customStyles="!border-gray-darker !w-full"
          />
          <Button
            type="submit"
            disabled={disabled}
            customStyles="border border-gray-darker !p-2.5"
            buttonProps={{ variant: 'tertiary', size: 'small', icon: { before: <PlaneSVG /> } }}
          />
        </form>
      </div>
    </div>
  );
};

ChatConversation.propTypes = ChatConversationPropTypes;

export default ChatConversation;
