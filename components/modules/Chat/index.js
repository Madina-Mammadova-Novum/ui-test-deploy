'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector, getAuthChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token, isAnon = true }) => {
  const dispatch = useDispatch();
  const { opened, messageCount } = useSelector(token ? getAuthChatSelector : getAnonChatSelector);

  const handleOpen = () => dispatch(setOpenedChat(!opened));

  const memoizedChatButton = useMemo(() => {
    return (
      <>
        <ChatButton
          variant="default"
          onClick={handleOpen}
          counter={messageCount}
          className="fixed bottom-3 right-3 z-100 block md:z-10"
        />
        {isAnon ? <AnonChat opened={opened} /> : <AuthChat opened={opened} token={token} />}
      </>
    );
  }, [token, opened, messageCount, handleOpen, isAnon]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
