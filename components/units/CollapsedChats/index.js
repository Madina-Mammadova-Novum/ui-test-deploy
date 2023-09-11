'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { removeCollapsedChat, resetUser, setConversation, setOpenedChat, setUser } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const CollapsedChats = () => {
  const dispatch = useDispatch();

  const {
    chats: { active },
    collapsedChats: { data },
  } = useSelector(getChatSelector);

  const onRemove = useCallback(
    async ({ id }) => {
      dispatch(resetUser());
      dispatch(removeCollapsedChat(id));
    },
    [dispatch]
  );

  const onActivate = useCallback(
    ({ chatId, vessel }) => {
      dispatch(setUser({ chatId, vessel }));
      dispatch(setConversation(true));
    },
    [dispatch]
  );

  const handleStartConversation = (id) => {
    const { chatId, vessel } = active?.find((session) => session?.chatId === id);

    onRemove({ id: chatId }).then(() => onActivate({ chatId, vessel }));

    dispatch(setOpenedChat(true));
  };

  const handleCloseConversation = (e, id) => {
    e.stopPropagation();

    onRemove({ id });
  };

  const printCollapsedChat = (session) => {
    return (
      <ChatButton
        counter={0}
        name={session?.name}
        key={session?.chatId}
        onClick={() => handleStartConversation(session?.chatId)}
        onClose={(e) => handleCloseConversation(e, session?.chatId)}
        className="h-auto"
      />
    );
  };

  return (
    data &&
    data?.length > 0 && (
      <div className="flex z-40 flex-col gap-4 fixed right-3 bottom-24">{data.map(printCollapsedChat)}</div>
    )
  );
};

export default CollapsedChats;
