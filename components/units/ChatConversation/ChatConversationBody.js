'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatConversationBodyPropTypes } from '@/lib/types';

import { ChatLoader } from '@/elements';
import { ROLES } from '@/lib';
import { getChatHistory } from '@/store/entities/chat/actions';
import { getChatSelector } from '@/store/selectors';
import { ChatMessage } from '@/units';

const ChatConversationBody = ({ isOpened }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { messages, loading, created, isLast, data, updating } = useSelector(getChatSelector).chats?.user;

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollRef?.current;

    const averageScrollPosition = scrollTop / (scrollHeight - clientHeight);
    const triggeredValue = parseFloat(averageScrollPosition.toFixed(2));

    const trigger = triggeredValue === -0.95 && !isLast && !loading && !updating;

    if (trigger) {
      dispatch(getChatHistory({ data: { id: data?.chatId, date: created } }));

      scrollRef.current.scrollTo({
        top: scrollTop / 1.5,
      });
    }
  };

  useEffect(() => {
    if (isOpened) {
      scrollRef.current.scroll({ bottom: 0, behavior: 'smooth' });
    }
  }, [isOpened]);

  const printMessage = ({ sender, id, message, time }) => {
    return <ChatMessage key={id} sender={sender} time={time} message={message} isBroker={ROLES.BROKER === sender} />;
  };

  const printMessages = ({ data: content, title, id }) => {
    return (
      <div className="flex flex-col" key={id}>
        <span className="text-gray text-xs-sm font-normal normal-case self-center py-2.5">{title}</span>
        {content?.map(printMessage)}
      </div>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <ChatLoader />;
    if (messages.length > 0) return messages.map(printMessages);
    return <p className="absolute w-full text-center top-0 font-semibold text-base">Empty history</p>;
  }, [loading, messages]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex relative flex-col-reverse h-96 overflow-scroll scroll-auto"
    >
      {printContent}
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
