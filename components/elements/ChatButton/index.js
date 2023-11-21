'use client';

import { useState } from 'react';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSessionIcon from '@/assets/icons/ChatSessionIcon';
import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({ counter, name, isOnline, onClick, onClose, withCancel, className = '', variant = 'default' }) => {
  const [hovered, setHovered] = useState(false);

  const buttons = {
    default: (
      <button
        key={name}
        type="button"
        onClick={onClick}
        className="relative flex items-center justify-center rounded-full shadow-2xmd z-30 outline-none border border-transparent h-16 w-16 bg-black"
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
        className="relative rounded-full shadow-2xmd z-30 outline-none bg-white border w-14 h-14 flex items-center justify-center border-gray-light"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ChatSessionIcon isOnline={isOnline} name={name} />
        <Badge counter={counter} onClose={onClose} withCancel={withCancel} name={name} hovered={hovered} />
      </button>
    ),
  };

  return <div className={className}>{buttons[variant]}</div>;
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
