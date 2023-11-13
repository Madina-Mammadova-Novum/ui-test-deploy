'use client';

import { useRef } from 'react';

import { ChatConversationBodyPropTypes } from '@/lib/types';

import { ChatLoader } from '@/elements';
import { ROLES } from '@/lib';
import { ChatMessage } from '@/units';

const ChatConversationBody = ({ messages = [], loading = false }) => {
  const scrollRef = useRef();
  // const [minus, setMinus] = useState(1);

  // const handleScroll = () => {
  //   const currentDate = new Date();

  //   if (scrollRef.current.scrollTop >= -425) {
  //     setMinus((prevValue) => prevValue + 1);
  //     currentDate.setDate(currentDate.getDate() - minus);
  //     const dayBeforeYesterday = currentDate.toISOString();

  //     dispatch(getChatHistory({ data: { id: user?.chatId, date: dayBeforeYesterday } }));
  //   }
  // };

  const printMessage = ({ sender, id, message, time }) => {
    return <ChatMessage key={id} sender={sender} time={time} message={message} isBroker={ROLES.BROKER === sender} />;
  };

  const printChatList = ({ data, title, id }) => {
    return (
      <div className="flex flex-col" key={id}>
        <span className="text-gray text-xs-sm font-normal normal-case self-center py-2.5">{title}</span>
        {data?.map(printMessage)}
      </div>
    );
  };

  return (
    <div ref={scrollRef} className={`flex flex-col-reverse h-96 ${!loading && 'overflow-scroll'}`}>
      <div className="relative">{loading ? <ChatLoader /> : messages.map(printChatList)}</div>
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
