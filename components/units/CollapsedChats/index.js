'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { removeCollapsedChat, setConversation, setOpenedChat, setUser } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const CollapsedChats = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector(getChatSelector);

  const onActivate = (user) => {
    dispatch(setConversation(true));
    dispatch(setOpenedChat(true));
    dispatch(setUser(user));
  };

  const onRemove = async ({ id }) => {
    await сhatSessionService.stop();
    dispatch(removeCollapsedChat(id));
  };

  const handleStartConversation = ({ id, key }) => {
    const user = chats[key]?.find((session) => session?.chatId === id);

    onRemove({ id: user?.chatId }).then(() => onActivate(user));
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
        onClick={() => handleStartConversation({ id: session?.chatId, key: session?.key })}
        onClose={(e) => handleCloseConversation(e, session?.chatId)}
        className="h-auto"
        withCancel
      />
    );
  };

  return (
    chats.collapsed.length > 0 && (
      <div className="flex z-40 flex-col gap-4 fixed right-4 bottom-24">{chats.collapsed.map(printCollapsedChat)}</div>
    )
  );
};

export default CollapsedChats;
