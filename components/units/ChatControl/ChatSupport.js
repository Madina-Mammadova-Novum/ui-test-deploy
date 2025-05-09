'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatSupportPropTypes } from '@/lib/types';

import SupportSVG from '@/assets/images/support.svg';
import { Badge, ChatHelpLoader, Title } from '@/elements';
import { removeCollapsedChat, resetUser, setConversation, setUser } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';

const ChatSupport = ({ title, description, loading }) => {
  const dispatch = useDispatch();
  const { chats, isActive } = useSelector(getAuthChatSelector);

  const onActivate = (user) => {
    dispatch(setUser(user));
    dispatch(setConversation(true));
  };

  const onRemove = ({ id }) => {
    dispatch(resetUser());
    dispatch(removeCollapsedChat(id));
  };

  const handleOpenConversation = (e) => {
    e.stopPropagation();

    if (
      chats?.support == null ||
      (isActive && (chats.support.length === 0 || chats.support[0]?.chatId === chats?.user?.data?.chatId))
    )
      return;

    onRemove({ id: chats?.support[0]?.chatId });
    onActivate(chats?.support[0]);
  };

  if (loading) return <ChatHelpLoader />;

  return (
    <div aria-hidden onClick={handleOpenConversation}>
      <div className="relative flex cursor-pointer items-center gap-x-3 text-black">
        {!!chats?.support?.length && <Badge counter={chats?.support[0]?.messageCount} className="right-0 top-1.5" />}
        <div className="h-10 w-0.5 rounded-xl bg-blue" />
        <SupportSVG />
        <div className="flex w-5/6 flex-col">
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
