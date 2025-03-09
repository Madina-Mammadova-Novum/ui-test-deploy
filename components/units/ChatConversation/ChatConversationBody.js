'use client';

import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatConversationBodyPropTypes } from '@/lib/types';

import { ChatLoader } from '@/elements';
import { ROLES } from '@/lib';
import { getChatHistory } from '@/store/entities/chat/actions';
import { getAuthChatSelector } from '@/store/selectors';
import { ChatMessage } from '@/units';

const ChatConversationBody = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { messages, loading, created, isLast, data, updating } = useSelector(getAuthChatSelector).chats?.user;

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollRef?.current;

    const averageScrollPosition = scrollTop / (scrollHeight - clientHeight);
    const triggeredValue = parseFloat(averageScrollPosition.toFixed(2));

    const trigger = triggeredValue === -0.95 && !isLast && !loading && !updating;

    if (trigger && data?.key !== 'support') {
      dispatch(getChatHistory({ data: { id: data?.chatId, date: created } }));

      scrollRef.current.scrollTo({
        top: scrollTop / 1.25,
      });
    }
  };

  const printMessage = ({ sender, message, time, id, type }, index) => {
    const newId = `${time}-${id}-${index}`;

    return (
      <ChatMessage
        key={newId}
        id={id}
        sender={sender}
        time={time}
        message={message}
        isBroker={ROLES.BROKER === sender}
        type={type}
      />
    );
  };

  const printMessages = ({ data: content, title }) => {
    return (
      <div className="flex flex-col px-2.5" key={title}>
        <span className="self-center py-2.5 text-xs-sm font-normal normal-case text-gray">{title}</span>
        {content?.map(printMessage)}
      </div>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <ChatLoader />;
    if (messages.length > 0) return messages.map(printMessages);
    return <p className="absolute top-0 w-full text-center text-base font-semibold">Empty history</p>;
  }, [loading, messages, printMessages]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="scroll-y-auto relative flex h-96 flex-col-reverse overflow-x-clip overflow-y-scroll"
    >
      {printContent}
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
