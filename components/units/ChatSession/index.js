'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import { ArchiveButton, Badge, ReActivateButton } from '@/elements';
import { сhatSessionServcie } from '@/services/signalR';
import { deactivateUserChat, reactivateUserChat } from '@/store/entities/chat/actions';
import { removeCollapsedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversationCard, ChatSubModal } from '@/units';

const ChatSession = ({ data, tab }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(getChatSelector).chats;

  const [state, setState] = useState({ deactivate: false, reactivate: false });

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModal = (e, key) => {
    e.stopPropagation();
    handleChangeState(key, !state[key]);
  };

  const handleConversation = (e, key) => {
    e.stopPropagation();
    handleChangeState(key, false);

    if (key === 'deactivate') dispatch(deactivateUserChat({ data: data?.chatId }));
    else dispatch(reactivateUserChat({ data: data?.chatId }));
  };

  const handleCancel = (e) => {
    e.stopPropagation();

    if (tab === 'active') handleChangeState('deactivate', false);
    else handleChangeState('reactivate', false);
  };

  const handleOpenConversation = () => {
    if (user.data?.chatId === data.chatId) return;

    dispatch(removeCollapsedChat(data?.chatId));
    сhatSessionServcie.initChat(data);
  };

  const actions = useMemo(
    () => ({
      active: <ArchiveButton onClick={(e) => handleModal(e, 'deactivate')} />,
      archived: <ReActivateButton onClick={(e) => handleModal(e, 'reactivate')} />,
      deactivate: (
        <ChatSubModal
          tab={tab}
          title="Do you want to archive this chat?"
          onCancel={(e) => handleCancel(e)}
          onClick={(e) => handleConversation(e, 'deactivate')}
        />
      ),
      reactivate: (
        <ChatSubModal
          tab={tab}
          title="Do you want to restore this chat?"
          onCancel={(e) => handleCancel(e)}
          onClick={(e) => handleConversation(e, 'reactivate')}
        />
      ),
    }),
    [tab, state.deactivate, state.reactivate]
  );

  return (
    <div className="flex justify-between relative cursor-pointer" aria-hidden onClick={handleOpenConversation}>
      <ChatConversationCard data={data} />
      <div className="flex flex-col relative justify-end overflow-x-hidden">
        <Badge className="h-5 w-5 -top-0.5 right-1 p-1" counter={data?.messageCount} />
        {actions[tab]}
        {state.deactivate && actions.deactivate}
        {state.reactivate && actions.reactivate}
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
