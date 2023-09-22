'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { ConversationButton, Title } from '@/elements';
import { chatService } from '@/services/signalR';
import { resetUser, setConversation, setUser } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const ChatSupport = ({ title, description }) => {
  const dispatch = useDispatch();

  const { support } = useSelector(getChatSelector);

  const handleOpenConversation = () => {
    dispatch(resetUser());

    chatService.initChat({ chatId: support?.chatId });

    dispatch(setConversation(true));
    dispatch(setUser(support));
  };

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
      <div className="flex flex-col items-center gap-y-1.5 pr-2">
        <ConversationButton onClick={handleOpenConversation} />
      </div>
    </div>
  );
};

ChatSupport.propTypes = ChatSupportPropTypes;

export default ChatSupport;
