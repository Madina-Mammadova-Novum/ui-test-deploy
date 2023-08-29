'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChatButton } from '@/elements';
import { getListOfChats } from '@/store/entities/chat/actions';
import { resetChatFilter } from '@/store/entities/chat/slice';
import { ChatModal } from '@/units';

const Chat = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(getListOfChats());
  }, [opened]);

  const handleOpened = () => setOpened((prevValue) => !prevValue);

  const handleClosed = () => {
    dispatch(resetChatFilter());
    setOpened(false);
  };

  return (
    <>
      <ChatButton counter={3} onClick={handleOpened} />
      <ChatModal isOpened={opened} onClose={handleClosed} />
    </>
  );
};

Chat.propTypes = {};

export default Chat;
