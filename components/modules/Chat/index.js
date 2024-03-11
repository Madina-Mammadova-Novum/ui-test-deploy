'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { getAnonChatSelector, getAuthChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
  const { opened, messageCount, isActive } = useSelector(token ? getAuthChatSelector : getAnonChatSelector);

  const handleOpen = () => сhatSessionService.onToggle(!opened);

  useEffect(() => {
    if (opened || isActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [opened, isActive]);

  return (
    <>
      <ChatButton
        variant="default"
        onClick={handleOpen}
        counter={messageCount}
        className="fixed right-3 bottom-3 z-20"
      />
      {token ? <AuthChat opened={opened} token={token} /> : <AnonChat opened={opened} />}
    </>
  );
};

Chat.propTypes = ChatPropTypes;

export default Chat;
