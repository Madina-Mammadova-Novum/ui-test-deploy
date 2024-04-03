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

  const printMessage = ({ sender, message, time, id }) => {
    return <ChatMessage id={id} sender={sender} time={time} message={message} isBroker={ROLES.BROKER === sender} />;
  };

  const printMessages = ({ data: content, title }) => {
    return (
      <div className="flex flex-col px-2.5" key={title}>
        <span className="text-gray text-xs-sm font-normal normal-case self-center py-2.5">{title}</span>
        {content?.map(printMessage)}
      </div>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <ChatLoader />;
    if (messages.length > 0) return messages.map(printMessages);
    return <p className="absolute w-full text-center top-0 font-semibold text-base">Empty history</p>;
  }, [loading, messages, printMessages]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex relative flex-col-reverse h-96 overflow-y-scroll scroll-y-auto overflow-x-clip"
    >
      {printContent}
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
