import { ChatConversationMessagePropTypes } from '@/lib/types';

const ChatConversationMessage = ({ sender, message, time, isBroker }) => {
  return (
    <div className={`flex flex-col py-2.5 w-full ${isBroker ? 'items-start' : 'items-end pr-5'}`}>
      <div className="flex flex-col gap-y-1">
        <p className="text-black uppercase text-xs-sm font-semibold">{sender}</p>
        <p
          className={`${
            isBroker ? 'bg-gray-darker bg-opacity-40' : 'bg-blue bg-opacity-10'
          } rounded-base px-2.5 py-1.5 text-xsm relative`}
        >
          {message}
        </p>
        <div className={`text-xs-sm text-gray font-normal flex w-full ${isBroker ? 'justify-start' : 'justify-end'} `}>
          {time}
        </div>
      </div>
    </div>
  );
};

ChatConversationMessage.propTypes = ChatConversationMessagePropTypes;

export default ChatConversationMessage;
