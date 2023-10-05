'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, Badge } from '@/elements';
import { chatService } from '@/services/signalR';
import { removeCollapsedChat, setCollapsedChat, setConversation } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatConversationCard, ChatDeactivate } from '@/units';

const ChatSession = ({ data }) => {
  const { user, collapsed } = useSelector(getChatSelector).chats;

  const inCollapsed = collapsed.find((chatRoom) => chatRoom?.chatId === data?.chatId);

  useEffect(() => {
    if (inCollapsed) dispatch(removeCollapsedChat(inCollapsed?.chatId));
  }, [inCollapsed, collapsed, data?.chatId]);

  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    deactivate: false,
    id: null,
  });

  const { deactivate } = modalState;

  const handleChangeState = (key, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleArchiveConversation = (e) => {
    e.stopPropagation();
    handleChangeState('deactivate', !deactivate);
  };

  const handleDeactivateConversation = (e) => {
    e.stopPropagation();
    handleChangeState('deactivate', false);
  };

  const handleCloseConversation = () => chatService.disconnect();

  const handleOpenConversation = () => {
    if (data?.chatId !== user?.chatId) handleCloseConversation();

    chatService?.initChat({
      chatId: data?.chatId,
      vessel: { name: data?.vessel?.name, data: data?.vessel?.data, cargoId: data?.vessel?.cargoId },
    });
  };

  const handleCollapseConversation = () => {
    dispatch(
      setCollapsedChat({
        chatId: user?.data?.chatId,
        name: user?.data?.vessel?.name,
        status: null,
        newMessages: 0,
      })
    );
    dispatch(setConversation(false));
  };

  return (
    <>
      <div className="flex justify-between relative cursor-pointer" aria-hidden onClick={handleOpenConversation}>
        <ChatConversationCard data={data} />
        <div className="flex flex-col relative justify-end">
          <Badge className="h-5 w-5 -top-0.5 right-1 p-1" counter={data?.messageCount} />
          <ArchiveButton onClick={(e) => handleArchiveConversation(e)} />
          {deactivate && (
            <ChatDeactivate
              title="Do you want to archive this chat?"
              onCancel={(e) => handleDeactivateConversation(e)}
            />
          )}
        </div>
      </div>
      <ChatConversation onCloseSession={handleCloseConversation} onCollapseSession={handleCollapseConversation} />
    </>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
