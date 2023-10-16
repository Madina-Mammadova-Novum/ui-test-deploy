'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import ChatConversationBody from './ChatConversationBody';
import СhatConversationHeader from './СhatConversationHeader';

import { ChatConversationPropTypes } from '@/lib/types';

import PlaneSVG from '@/assets/images/plane.svg';
import { Button, Input } from '@/elements';
import { chatService } from '@/services/signalR';
import { getChatSelector } from '@/store/selectors';

const ChatConversation = ({ isOpened, isMediumScreen, onCloseSession, onCollapseSession }) => {
  const { data, messages, loading } = useSelector(getChatSelector).chats?.user;

  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (message !== '') setDisabled(false);
    else setDisabled(true);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    chatService.sendMessage({ message });
    setMessage('');
  };

  const handleMessage = ({ target: { value } }) => setMessage(value);
  const handleEnter = ({ charCode }) => charCode === 13 && handleSubmit();

  const setConversationPosition = useMemo(() => {
    if (isMediumScreen && isOpened) return 'right-24';
    return 'right-[480px]';
  }, [isMediumScreen, isOpened]);

  return (
    isOpened && (
      <div
        className={`fixed bg-white border shadow-xmd border-gray-light ${setConversationPosition} bottom-6 h-auto w-[360px] rounded-base z-50`}
      >
        <СhatConversationHeader data={data} onClose={onCloseSession} onCollapse={onCollapseSession} />
        <div className="flex flex-col h-[47vh] p-5">
          <ChatConversationBody messages={messages} loading={loading} />
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
    )
  );
};

ChatConversation.propTypes = ChatConversationPropTypes;

export default ChatConversation;
