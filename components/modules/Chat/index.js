'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector, getAuthChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
  const dispatch = useDispatch();
  const { opened, messageCount, isActive } = useSelector(token ? getAuthChatSelector : getAnonChatSelector);

  const handleOpen = () => dispatch(setOpenedChat(!opened));

  useEffect(() => {
    if (opened || isActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [opened, isActive]);

  const memoizedChatButton = useMemo(() => {
    return (
      <>
        <ChatButton
          variant="default"
          onClick={handleOpen}
          counter={messageCount}
          className="fixed bottom-3 right-3 z-10 hidden md:block"
        />
        {token ? <AuthChat opened={opened} token={token} /> : <AnonChat opened={opened} />}
      </>
    );
  }, [token, opened, messageCount, handleOpen]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
