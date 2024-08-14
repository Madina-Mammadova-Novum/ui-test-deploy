import { ChatSessionIconPropTypes } from '@/lib/types';

const ChatSessionIcon = ({ name, isOnline }) => {
  const words = name?.split(' ');
  const tagName = words?.map((word) => word.charAt(0));

  return (
    <div className="relative">
      <span className="mx-auto text-xsm font-semibold uppercase">{tagName}</span>
      {isOnline && (
        <div className="absolute -bottom-[18px] -right-[18px] rounded-full border border-white bg-green p-1.5" />
      )}
    </div>
  );
};

ChatSessionIcon.propTypes = ChatSessionIconPropTypes;

export default ChatSessionIcon;
