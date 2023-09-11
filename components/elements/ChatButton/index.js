'use client';

'use client';

import { useMemo } from 'react';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({ counter, name, onClick, onClose, className = '' }) => {
  const printIcon = useMemo(() => {
    if (name) return <p className="text-xsm font-semibold mx-auto uppercase">{name?.slice(0, 2)}</p>;

    return <ChatSVG />;
  }, [name]);

  const setStyles = useMemo(() => {
    if (name) return 'bg-white border p-5 border-gray-light';

    return 'border border-transparent p-4 bg-black';
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className={`relative rounded-full shadow-2xmd z-30 outline-none ${setStyles}`}
      >
        {printIcon}
        <Badge counter={counter} onClose={onClose} />
      </button>
    </div>
  );
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
