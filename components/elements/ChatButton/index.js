'use client';

import { useMemo } from 'react';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSessionIcon from '@/assets/icons/ChatSessionIcon';
import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({ counter, name, isOnline, onClick, onClose, hovered, withCancel, className = '', ...rest }) => {
  const printIcon = useMemo(() => {
    if (name) return <ChatSessionIcon isOnline={isOnline} name={name} />;

    return <ChatSVG />;
  }, [name, isOnline]);

  const setStyles = useMemo(() => {
    if (name) return 'bg-white border w-14 h-14 flex items-center justify-center border-gray-light';

    return 'border border-transparent p-4 bg-black';
  }, [name]);

  return (
    <div className={className} {...rest}>
      <button
        type="button"
        onClick={onClick}
        className={`relative rounded-full shadow-2xmd z-30 w outline-none ${setStyles}`}
      >
        {printIcon}
        <Badge counter={counter} onClose={onClose} withCancel={withCancel} name={name} hovered={hovered} />
      </button>
    </div>
  );
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
