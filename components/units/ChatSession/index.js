'use client';

import { useMemo, useState } from 'react';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, ConversationButton } from '@/elements';
import { ChatConversation, ChatConversationCard, ChatDeactivate } from '@/units';

const ChatSession = ({ data }) => {
  const [modalState, setModalState] = useState({
    setMore: false,
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

  const handleConversation = () => handleChangeState('setConversation', true);

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
    return setConversation && <ChatConversation />;
  }, [setConversation]);

  return (
    <>
      <div className="flex justify-between">
        <ChatConversationCard data={data} />
        <div className="flex flex-col">
          <ConversationButton counter={data?.unreaded} onClick={handleConversation} />
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
