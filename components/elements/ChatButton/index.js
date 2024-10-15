'use client';

import { useState } from 'react';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSessionIcon from '@/assets/icons/ChatSessionIcon';
import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({
  counter = 0,
  name,
  isOnline,
  onClick,
  onClose,
  isTyping,
  withCancel,
  className = '',
  variant = 'default',
}) => {
  const [hovered, setHovered] = useState(false);

  const buttons = {
    default: (
      <button
        key={name}
        type="button"
        onClick={onClick}
        className="relative z-30 flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-black shadow-2xmd outline-none"
      >
        <ChatSVG className="absolute" />;
        <Badge counter={counter} />
      </button>
    ),
    conversation: (
      <button
        key={name}
        type="button"
        onClick={onClick}
        className="relative z-30 flex h-14 w-14 items-center justify-center rounded-full border border-gray-light bg-white shadow-2xmd outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ChatSessionIcon isOnline={isOnline} name={name} />
        <Badge
          counter={counter}
          onClose={onClose}
          withCancel={withCancel}
          typing={isTyping}
          name={name}
          hovered={hovered}
        />
      </button>
    ),
  };

  return <div className={className}>{buttons[variant]}</div>;
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
