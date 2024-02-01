'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, Badge, ReActivateButton } from '@/elements';
import { сhatSessionService } from '@/services/signalR';
import { deactivateUserChat, reactivateUserChat } from '@/store/entities/chat/actions';
import { removeCollapsedChat, setConversation, setUser } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversationCard, ChatSubModal } from '@/units';

const ChatSession = ({ data, tab, sessionId, setSessionId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(getChatSelector).chats;

  const handleModal = (e, id) => {
    e.stopPropagation();
    setSessionId(id);
  };

  const handleAction = (e, key) => {
    e.stopPropagation();
    setSessionId('');

    if (key === 'deactivate') {
      dispatch(deactivateUserChat({ data: data?.chatId }));
    } else {
      dispatch(reactivateUserChat({ data: data?.chatId }));
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setSessionId('');
  };

  const handleOpenConversation = () => {
    if (user.data?.chatId === data.chatId) return;

    сhatSessionService.stop();

    dispatch(removeCollapsedChat(data?.chatId));
    dispatch(setUser(data));
    dispatch(setConversation(true));
  };

  const actions = useMemo(
    () => ({
      active: <ArchiveButton onClick={(e) => handleModal(e, data?.chatId)} />,
      archived: <ReActivateButton onClick={(e) => handleModal(e, data?.chatId)} />,
      deactivate: (
        <ChatSubModal
          tab={tab}
          title="Do you want to archive this chat?"
          onCancel={(e) => handleCancel(e)}
          onClick={(e) => handleAction(e, 'deactivate')}
        />
      ),
      reactivate: (
        <ChatSubModal
          tab={tab}
          title="Do you want to restore this chat?"
          onCancel={(e) => handleCancel(e)}
          onClick={(e) => handleAction(e, 'reactivate')}
        />
      ),
    }),
    [tab, sessionId]
  );

  const state = {
    active: actions.deactivate,
    archived: actions.reactivate,
  };

  return (
    <div className="flex justify-between relative cursor-pointer" aria-hidden onClick={handleOpenConversation}>
      <ChatConversationCard data={data} />
      <div className="flex flex-col relative justify-end overflow-x-hidden">
        <Badge className="h-5 w-5 -top-0.5 right-1 p-1" counter={data?.messageCount} />
        <div>{actions[tab]}</div>
        {sessionId === data?.chatId && state[tab]}
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
