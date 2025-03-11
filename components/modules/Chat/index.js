'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector, getAuthChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
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
          className="z-100 fixed bottom-3 right-3 block md:z-10"
        />
        {token ? <AuthChat opened={opened} token={token} /> : <AnonChat opened={opened} />}
      </>
    );
  }, [token, opened, messageCount, handleOpen]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
