'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, Badge } from '@/elements';
import { chatService } from '@/services/signalR';
import { deactivateUserChat } from '@/store/entities/chat/actions';
import { ChatConversationCard, ChatDeactivate } from '@/units';

const ChatSession = ({ data }) => {
  const [deactivate, setDeactivate] = useState(false);
  const dispatch = useDispatch();

  const handleArchivedModal = (e) => {
    e.stopPropagation();
    setDeactivate(!deactivate);
  };

  const handleDeactivateConversation = (e) => {
    e.stopPropagation();
    dispatch(deactivateUserChat({ data: data?.chatId }));
    setDeactivate(false);
  };

  const handleCancelArchived = (e) => {
    e.stopPropagation();
    setDeactivate(false);
  };

  const handleOpenConversation = () => {
    chatService?.initChat({
      chatId: data?.chatId,
      vessel: { name: data?.vessel?.name, data: data?.vessel?.data, cargoId: data?.vessel?.cargoId },
    });
  };

  return (
    <div className="flex justify-between relative cursor-pointer" aria-hidden onClick={handleOpenConversation}>
      <ChatConversationCard data={data} />
      <div className="flex flex-col relative justify-end">
        <Badge className="h-5 w-5 -top-0.5 right-1 p-1" counter={data?.messageCount} />
        <ArchiveButton onClick={(e) => handleArchivedModal(e)} />
        {deactivate && (
          <ChatDeactivate
            title="Do you want to archive this chat?"
            onCancel={(e) => handleCancelArchived(e)}
            onDeactivate={(e) => handleDeactivateConversation(e)}
          />
        )}
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
