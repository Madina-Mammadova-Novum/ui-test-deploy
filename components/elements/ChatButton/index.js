'use client';

import { ChatButtonPropTypes } from '@/lib/types';

import ChatSVG from '@/assets/images/chat.svg';
import { Badge } from '@/elements';

const ChatButton = ({ counter, onClick, className }) => {
  return (
    <div className={`${className} absolute right-3 bottom-3`}>
      <button type="button" onClick={onClick} className="p-4 relative rounded-full border-none outline-none bg-black">
        <ChatSVG />
        <Badge counter={counter} />
      </button>
    </div>
  );
};

ChatButton.propTypes = ChatButtonPropTypes;

export default ChatButton;
