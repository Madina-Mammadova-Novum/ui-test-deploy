import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { ConversationButton, Title } from '@/elements';

const ChatSupport = ({ title, description }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-black flex items-center gap-x-3">
        <div className="w-0.5 h-10 rounded-xl bg-blue" />
        <SupportSVG />
        <div className="flex flex-col">
          <Title level="6" className="text-sm font-semibold">
            {title}
          </Title>
          {description && <p className="text-xsm">{description}</p>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-1.5">
        <ConversationButton onClick={() => {}} />
      </div>
    </div>
  );
};

ChatSupport.propTypes = ChatSupportPropTypes;

export default ChatSupport;
