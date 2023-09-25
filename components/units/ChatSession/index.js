'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton } from '@/elements';
import { chatService } from '@/services/signalR';
import {
  removeCollapsedChat,
  resetUser,
  setCollapsedChat,
  setConversation,
  setUser,
} from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatConversationCard, ChatDeactivate } from '@/units';

const ChatSession = ({ data }) => {
  const { user, collapsed } = useSelector(getChatSelector).chats;

  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    setDeactivate: false,
    setCargoeInfo: false,
  });

  const handleChangeState = (key, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleArchiveConversation = (e) => {
    e.stopPropagation();
    handleChangeState('setDeactivate', !setDeactivate);
  };

  const handleDeactivateConversation = (e) => {
    e.stopPropagation();
    handleChangeState('setDeactivate', false);
  };

  const handleOpenConversation = () => {
    chatService?.initChat({ chatId: data?.chatId });
    dispatch(setConversation(true));

    dispatch(resetUser());

    const existedCollapsed = collapsed.find((chatRoom) => chatRoom?.chatId === data?.chatId);
    if (existedCollapsed) dispatch(removeCollapsedChat(existedCollapsed?.chatId));

    dispatch(
      setUser({
        chatId: data?.chatId,
        vessel: { name: data?.vessel?.name, data: data?.vessel?.data, cargoId: data?.vessel?.cargoId },
      })
    );
  };

  const handleCloseConversation = () => {
    dispatch(setConversation(false));
    dispatch(resetUser());
    chatService.stop();
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

  const { setDeactivate } = modalState;

  return (
    <>
      <div className="flex justify-between cursor-pointer" aria-hidden onClick={() => handleOpenConversation()}>
        <ChatConversationCard data={data} />
        <div className="flex flex-col justify-end">
          <ArchiveButton onClick={(e) => handleArchiveConversation(e)} />
          {setDeactivate && (
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
