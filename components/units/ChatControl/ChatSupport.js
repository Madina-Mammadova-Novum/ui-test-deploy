'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { Badge, ChatHelpLoader, Title } from '@/elements';
import { сhatSessionServcie } from '@/services/signalR';
import { removeCollapsedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { getCookieFromBrowser } from '@/utils/helpers';

const ChatSupport = ({ title, description, loading }) => {
  const dispatch = useDispatch();
  const { support } = useSelector(getChatSelector).chats;
  const token = getCookieFromBrowser('session-access-token');

  const handleOpenConversation = (e) => {
    e.stopPropagation();

    dispatch(removeCollapsedChat(support[0]?.chatId));

    сhatSessionServcie.initChat({ data: support[0], token });
  };

  if (loading) return <ChatHelpLoader />;

  return (
    <div aria-hidden onClick={handleOpenConversation}>
      <div className="text-black relative flex items-center gap-x-3 cursor-pointer">
        {!!support?.length && <Badge counter={support[0]?.messageCount} className="right-3 top-1.5" />}
        <div className="w-0.5 h-10 rounded-xl bg-blue" />
        <SupportSVG />
        <div className="flex flex-col  w-5/6">
          <Title level="6" className="text-sm font-semibold hover:text-blue">
            {title}
          </Title>
          {description && <p className="text-xsm">{description}</p>}
        </div>
      </div>
    </div>
  );
};

ChatSupport.propTypes = ChatSupportPropTypes;

export default ChatSupport;
