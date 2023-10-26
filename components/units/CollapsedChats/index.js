'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { chatService } from '@/services/signalR';
import { removeCollapsedChat, resetUser, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const CollapsedChats = () => {
  const dispatch = useDispatch();

  const {
    chats: { active },
    collapsedChats: { data },
  } = useSelector(getChatSelector);

  const onActivate = ({ chatId, vessel, archieved }) => chatService.initChat({ chatId, vessel, archieved });

  const onRemove = async ({ id }) => {
    dispatch(resetUser());
    dispatch(removeCollapsedChat(id));
    chatService.disconnect();
  };

  const handleStartConversation = (id) => {
    const { chatId, vessel, archieved } = active?.find((session) => session?.chatId === id);

    onRemove({ id: chatId }).then(() => {
      onActivate({ chatId, vessel, archieved });
      dispatch(setOpenedChat(true));
    });
  };

  const handleCloseConversation = (e, id) => {
    e?.stopPropagation();

    onRemove({ id });
  };

  const printCollapsedChat = (session) => {
    return (
      <ChatButton
        withCancel
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
    data?.length > 0 && (
      <div className="flex z-40 flex-col gap-4 fixed right-3 bottom-24">{data.map(printCollapsedChat)}</div>
    )
  );
};

export default CollapsedChats;
