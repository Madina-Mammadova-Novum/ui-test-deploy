'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatPropTypes } from '@/lib/types';

import { ChatButton } from '@/elements';
import { chatNotificationService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { setOpenedChat } from '@/store/entities/chat/slice';
import { fetchCountries } from '@/store/entities/general/actions';
import { getChatSelector } from '@/store/selectors';
import { AnonChat, AuthChat } from '@/units';

const Chat = ({ isAuth }) => {
  const dispatch = useDispatch();

  const { opened, newMessages, chats } = useSelector(getChatSelector);

  const handleOpen = useCallback(() => dispatch(setOpenedChat(!opened)), [opened, dispatch]);

  useEffect(() => {
    if (isAuth) {
      chatNotificationService.initStatus();
      dispatch(getListOfChats());
    }
    dispatch(fetchCountries());
  }, [isAuth]);

  useEffect(() => {
    if (opened) document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  const printChat = useMemo(() => {
    if (isAuth) {
      return <AuthChat user={chats?.user?.data} />;
    }
    return <AnonChat isOpened={opened} />;
  }, [isAuth, opened, chats.user.data]);

  return (
    <>
      <ChatButton
        counter={newMessages}
        onClick={handleOpen}
        className="fixed right-3 bottom-3 z-30"
        variant="default"
      />
      {printChat}
    </>
  );
};

Chat.propTypes = ChatPropTypes;

export default Chat;
