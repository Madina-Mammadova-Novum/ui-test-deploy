'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { removeCollapsedChat, resetUser, setConversation, setOpenedChat, setUser } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';

const CollapsedChats = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector(getAuthChatSelector);

  const onActivate = (user) => {
    dispatch(setUser(user));
    dispatch(setOpenedChat(true));
    dispatch(setConversation(true));
  };

  const onRemove = ({ id }) => {
    сhatSessionService.stop();
    dispatch(removeCollapsedChat(id));
    dispatch(resetUser());
  };

  const handleStartConversation = ({ id }) => {
    const user = chats.collapsed?.find((session) => session?.chatId === id);

    onRemove({ id: user?.chatId });
    onActivate(user);
  };

  const handleCloseConversation = (e, id) => {
    e?.stopPropagation();
    onRemove({ id });
  };

  const printCollapsedChat = (session) => {
    return (
      <ChatButton
        variant="conversation"
        key={session?.chatId}
        counter={session?.messageCount}
        name={session?.vessel?.name}
        isOnline={session?.isOnline}
        isTyping={session?.isTyping}
        onClick={() => handleStartConversation({ id: session?.chatId })}
        onClose={(e) => handleCloseConversation(e, session?.chatId)}
        className="h-auto"
        withCancel
      />
    );
  };

  return (
    chats.collapsed.length > 0 && (
      <div className="msm:bottom-[8.5rem] fixed bottom-40 right-5 flex flex-col gap-4 md:bottom-24">
        {chats.collapsed.map(printCollapsedChat)}
      </div>
    )
  );
};

export default CollapsedChats;
