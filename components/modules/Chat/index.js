'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
import { AuthChat } from '@/units';

const Chat = ({ token }) => {
  const dispatch = useDispatch();
  const { opened, messageCount } = useSelector(getAuthChatSelector);

  const handleOpen = () => dispatch(setOpenedChat(!opened));

  const memoizedChatButton = useMemo(() => {
    return (
      <>
        <ChatButton
          variant="default"
          onClick={handleOpen}
          counter={messageCount}
          className="fixed bottom-3 right-3 z-10 block"
        />
        <AuthChat opened={opened} token={token} />
      </>
    );
  }, [token, opened, messageCount, handleOpen]);

  return memoizedChatButton;
};

Chat.propTypes = ChatPropTypes;

export default Chat;
