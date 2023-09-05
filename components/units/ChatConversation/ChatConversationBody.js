'use client';

import { ChatConversationBodyPropTypes } from '@/lib/types';

import { ROLES } from '@/lib';
import { ChatMessage } from '@/units';

const ChatConversationBody = ({ messages = [] }) => {
  const printChatMessage = ({ message, id, sender, time }) => {
    if (sender === ROLES.OWNER)
      return <ChatMessage key={id} time={time} sender={sender} message={message} isBroker={false} />;
    return <ChatMessage key={id} time={time} sender={sender} message={message} isBroker />;
  };

  return (
    <div className="flex flex-col-reverse h-96 overflow-scroll">
      <div className="relative">{messages.map(printChatMessage)}</div>
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
