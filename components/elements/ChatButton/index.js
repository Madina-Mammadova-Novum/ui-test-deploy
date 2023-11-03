'use client';

import { useMemo } from 'react';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSessionIcon from '@/assets/icons/ChatSessionIcon';
import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({ counter, name, isOnline, onClick, onClose, withCancel, className = '' }) => {
  const printIcon = useMemo(() => {
    if (name) return <ChatSessionIcon isOnline={isOnline} name={name} />;

    return <ChatSVG />;
  }, [name, isOnline]);

  const setStyles = useMemo(() => {
    if (name) return 'bg-white border p-5 border-gray-light';

    return 'border border-transparent p-4 bg-black';
  }, [name]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className={`relative rounded-full shadow-2xmd z-30 outline-none ${setStyles}`}
      >
        {printIcon}
        <Badge counter={counter} onClose={onClose} withCancel={withCancel} />
      </button>
    </div>
  );
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
