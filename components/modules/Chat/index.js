'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { getListOfChats } from '@/store/entities/chat/actions';
import { messageAlert, setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
  const dispatch = useDispatch();

  const { opened, messageCount, chats } = useSelector(getAnonChatSelector);

  const handleOpen = useCallback(() => dispatch(setOpenedChat(!opened)), [opened, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getListOfChats());
    }
  }, [token]);

  useEffect(() => {
    if (opened) {
      document.body.classList.add('overflow-hidden');
      dispatch(messageAlert({ chatId: chats?.user?.data?.chatId, messageCount: 0 }));
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  return (
    <>
      <ChatButton
        variant="default"
        onClick={handleOpen}
        counter={messageCount}
        className="fixed right-3 bottom-3 z-30"
      />
      {token ? <AuthChat user={chats?.user?.data} /> : <AnonChat isOpened={opened} />}
    </>
  );
};

Chat.propTypes = ChatPropTypes;

export default Chat;
