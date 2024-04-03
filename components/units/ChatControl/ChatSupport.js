'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { Badge, ChatHelpLoader, Title } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { resetUser, setConversation, setUser } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';

const ChatSupport = ({ title, description, loading }) => {
  const dispatch = useDispatch();
  const { chats, isActive } = useSelector(getAuthChatSelector);

  const onActivate = (user) => {
    dispatch(setUser(user));
    dispatch(setConversation(true));
  };

  const onRemove = async () => {
    await сhatSessionService.stop();
    dispatch(resetUser());
  };

  const handleOpenConversation = async (e) => {
    e.stopPropagation();

    if (isActive && chats.support[0]?.chatId === chats?.user.data?.chatId) return;

    onRemove({ id: chats.support[0]?.chatId }).then(() => onActivate(chats.support[0]));
  };

  if (loading) return <ChatHelpLoader />;

  return (
    <div aria-hidden onClick={handleOpenConversation}>
      <div className="text-black relative flex items-center gap-x-3 cursor-pointer">
        {!!chats?.support?.length && <Badge counter={chats?.support[0]?.messageCount} className="right-0 top-1.5" />}
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
