'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { Badge, Title } from '@/elements';
import { chatService } from '@/services/signalR';
import { getChatSelector } from '@/store/selectors';

const ChatSupport = ({ title, description }) => {
  const { support } = useSelector(getChatSelector).chats;

  const handleOpenConversation = (e) => {
    e.stopPropagation();

    chatService.initChat(support[0]);
  };

  useEffect(() => {
    return () => {
      chatService.disconnect();
    };
  }, []);

  return (
    <div aria-hidden onClick={handleOpenConversation}>
      <div className="text-black relative flex items-center gap-x-3 cursor-pointer">
        <Badge counter={support?.[0]?.messageCount} />
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
