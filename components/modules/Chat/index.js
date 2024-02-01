'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { chatNotificationService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { getAnonChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ token }) => {
  const dispatch = useDispatch();

  const { opened, messageCount, chats } = useSelector(getAnonChatSelector);

  const handleOpen = useCallback(() => dispatch(setOpenedChat(!opened)), [opened]);

  const initChat = async () => {
    await chatNotificationService.init({ token });
    dispatch(getListOfChats());
  };

  useEffect(() => {
    if (token) {
      initChat();
    }
  }, [token]);

  useEffect(() => {
    if (opened) {
      document.body.classList.add('overflow-hidden');
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
        className="fixed right-3 bottom-3 z-50"
      />
      {token ? <AuthChat user={chats.user?.data} opened={opened} /> : <AnonChat opened={opened} />}
    </>
  );
};

Chat.propTypes = ChatPropTypes;

export default Chat;
