'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, ConversationButton } from '@/elements';
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
  const dispatch = useDispatch();

  const {
    isActive,
    chats: { user, collapsed },
  } = useSelector(getChatSelector);

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

  const handleOpenConversation = () => {
    dispatch(resetUser());
    dispatch(setConversation(true));

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

  const printDeactivateModal = useMemo(() => {
    return (
      setDeactivate && (
        <ChatDeactivate
          title="Do you want to archive this chat?"
          onCancel={() => handleChangeState('setDeactivate', false)}
        />
      )
    );
  }, [setDeactivate]);

  const printConversationModal = useMemo(() => {
    return (
      isActive && (
        <ChatConversation onCloseSession={handleCloseConversation} onCollapseSession={handleCollapseConversation} />
      )
    );
  }, [isActive]);

  return (
    <>
      <div className="flex justify-between">
        <ChatConversationCard data={data} />
        <div className="flex flex-col">
          <ConversationButton counter={data?.unreaded} onClick={handleOpenConversation} />
          <ArchiveButton onClick={() => handleChangeState('setDeactivate', !setDeactivate)} />
          {printDeactivateModal}
        </div>
      </div>
      {printConversationModal}
    </>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
