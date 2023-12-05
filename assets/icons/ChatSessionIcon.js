import { ChatSessionIconPropTypes } from '@/lib/types';

const ChatSessionIcon = ({ name, isOnline }) => {
  const words = name?.split(' ');
  const tagName = words?.map((word) => word.charAt(0));

  return (
    <div className="relative">
      <span className="text-xsm font-semibold mx-auto uppercase">{tagName}</span>
      {isOnline && (
        <div className="border border-white rounded-full absolute -bottom-[18px] -right-[18px] bg-green p-1.5" />
      )}
    </div>
  );
};

ChatSessionIcon.propTypes = ChatSessionIconPropTypes;

export default ChatSessionIcon;
