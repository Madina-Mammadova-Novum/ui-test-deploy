'use client';

import { useState } from 'react';

import { ChatButton } from '@/elements';
import { ChatModal } from '@/units';

const Chat = () => {
  const [opened, setOpened] = useState(false);

  const handleOpened = () => setOpened((prevValue) => !prevValue);
  const handleClosed = () => setOpened(false);

  return (
    <>
      <ChatButton counter={3} onClick={handleOpened} />
      <ChatModal isOpened={opened} onClose={handleClosed} />
    </>
  );
};

Chat.propTypes = {};

export default Chat;
