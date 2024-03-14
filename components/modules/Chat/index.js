'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { getAnonChatSelector, getAuthChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
  const [show, setShow] = useState(false);

  const { opened, messageCount, isActive } = useSelector(token ? getAuthChatSelector : getAnonChatSelector);

  const handleOpen = () => сhatSessionService.onToggle(!opened);

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      setShow(false);
      clearTimeout(renderTimer);
    };
  }, []);

  useEffect(() => {
    if (opened || isActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [opened, isActive]);

  const memoizedChatButton = useMemo(() => {
    return (
      show && (
        <>
          <ChatButton
            variant="default"
            onClick={handleOpen}
            counter={messageCount}
            className="fixed right-3 bottom-3 z-20"
          />
          {token ? <AuthChat opened={opened} token={token} /> : <AnonChat opened={opened} />}
        </>
      )
    );
  }, [token, show, opened, messageCount, handleOpen]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
