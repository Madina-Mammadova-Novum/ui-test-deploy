'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { Title } from '@/elements';
import { chatService } from '@/services/signalR';
import { resetUser, setUser } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const ChatSupport = ({ title, description }) => {
  const dispatch = useDispatch();

  const { support } = useSelector(getChatSelector);

  const handleOpenConversation = (e) => {
    e.stopPropagation();
    dispatch(resetUser());

    chatService.initChat({ chatId: support?.chatId });
    dispatch(setUser(support));
  };

  return (
    <div aria-hidden onClick={handleOpenConversation}>
      <div className="text-black flex items-center gap-x-3 cursor-pointer">
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
