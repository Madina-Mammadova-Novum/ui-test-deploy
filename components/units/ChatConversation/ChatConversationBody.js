'use client';

import { useRef } from 'react';

import { ChatConversationBodyPropTypes } from '@/lib/types';

import { ROLES } from '@/lib';
import { ChatMessage } from '@/units';

const ChatConversationBody = ({ messages = [] }) => {
  const scrollRef = useRef();
  // const [minus, setMinus] = useState(1);

  // const dispatch = useDispatch();

  // const { data: user } = useSelector(getChatSelector)?.chats?.user;

  // useEffect(() => {
  //   dispatch(getChatHistory({ data: { id: user?.chatId, date: '2023-09-01' } }));
  // }, [user?.chatId]);

  // const handleScroll = () => {
  //   const currentDate = new Date();

  //   if (scrollRef.current.scrollTop >= -425) {
  //     setMinus((prevValue) => prevValue + 1);
  //     currentDate.setDate(currentDate.getDate() - minus);
  //     const dayBeforeYesterday = currentDate.toISOString();

  //     dispatch(getChatHistory({ data: { id: user?.chatId, date: dayBeforeYesterday } }));
  //   }
  // };

  const printChatMessage = ({ sender, id, message, time }) => {
    return <ChatMessage key={id} sender={sender} time={time} message={message} isBroker={ROLES.BROKER === sender} />;
  };

  return (
    <div ref={scrollRef} className="flex flex-col-reverse h-96 overflow-scroll">
      <div className="relative">
        {messages.map(({ data, title, id }) => {
          return (
            <div className="flex flex-col" key={id}>
              <span className="text-gray text-xs-sm font-normal normal-case self-center py-2.5">{title}</span>
              {data?.map(printChatMessage)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ChatConversationBody.propTypes = ChatConversationBodyPropTypes;

export default ChatConversationBody;
