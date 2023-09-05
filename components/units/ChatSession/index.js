'use client';

import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, ConversationButton } from '@/elements';
import { resetCurrentUser, setCurrentUser } from '@/store/entities/chat/slice';
import { ChatConversation, ChatConversationCard, ChatDeactivate } from '@/units';

const ChatSession = ({ data }) => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    setDeactivate: false,
    setConversation: false,
    setCargoeInfo: false,
  });

  const handleChangeState = (key, value) => {
    setModalState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOpenConversation = () => {
    handleChangeState('setConversation', true);
    dispatch(
      setCurrentUser({
        chatId: data?.chatId,
        vessel: { name: data?.vessel?.name, data: data?.vessel?.data, cargoId: data?.vessel?.cargoId },
      })
    );
  };

  const handleCloseConversation = () => {
    handleChangeState('setConversation', false);
    dispatch(resetCurrentUser());
  };

  const { setDeactivate, setConversation } = modalState;

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
    return setConversation && <ChatConversation onCloseSession={handleCloseConversation} />;
  }, [setConversation]);

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
