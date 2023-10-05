'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { chatService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { resetChatFilter, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatModal, CollapsedChats } from '@/units';

const Chat = () => {
  const dispatch = useDispatch();

  const { opened } = useSelector(getChatSelector);

  const handleOpen = () => dispatch(setOpenedChat(!opened));

  const handleClose = async () => {
    dispatch(resetChatFilter());
    dispatch(setOpenedChat(false));
  };

  useEffect(() => {
    chatService.initStatus();
  }, []);

  useEffect(() => {
    if (opened) dispatch(getListOfChats());
  }, [opened]);

  return (
    <>
      <ChatButton counter={1} onClick={handleOpen} className="fixed right-3 bottom-3 z-30" />
      <ChatModal isOpened={opened} onClose={handleClose} />
      <CollapsedChats />
    </>
  );
};

Chat.propTypes = {};

export default Chat;
