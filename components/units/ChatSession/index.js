'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatSessionPropTypes } from '@/lib/types';

import ChatBubbleUserSVG from '@/assets/images/chatBubbleUser.svg';
import { ArchiveButton, Badge, HoverableIcon, HoverTooltip, ReActivateButton } from '@/elements';
import { deactivateUserChat, reactivateUserChat } from '@/store/entities/chat/actions';
import { removeCollapsedChat, resetUser, setConversation, setUser } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
import { ChatConversationCard, ChatSubModal } from '@/units';

const ChatSession = ({ data, tab, sessionId, setSessionId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { chats, isActive } = useSelector(getAuthChatSelector);

  const handleModal = (e, id) => {
    e.stopPropagation();
    setSessionId(id);

    setTimeout(() => {
      ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
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

  const onActivate = (user) => {
    dispatch(setUser(user));
    dispatch(setConversation(true));
  };

  const onRemove = ({ id }) => {
    dispatch(resetUser());
    dispatch(removeCollapsedChat(id));
  };

  const handleOpenConversation = () => {
    if (isActive && chats?.user?.data?.chatId === data.chatId) return;

    onRemove({ id: data?.chatId });
    onActivate(data);
  };

  const actions = {
    active: (
      <HoverTooltip className="!-left-20 !-top-[0.375rem]" data={{ description: 'Archive' }}>
        <ArchiveButton onClick={(e) => handleModal(e, data?.chatId)} />
      </HoverTooltip>
    ),
    archived: (
      <HoverTooltip className="!-left-[6.25rem] !-top-[0.375rem]" data={{ description: 'Reactivate' }}>
        <ReActivateButton onClick={(e) => handleModal(e, data?.chatId)} />
      </HoverTooltip>
    ),
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
  };

  const state = {
    active: actions.deactivate,
    archived: actions.reactivate,
  };

  return (
    <div
      ref={ref}
      aria-hidden
      onClick={handleOpenConversation}
      className="relative flex cursor-pointer justify-between"
    >
      <ChatConversationCard data={data} />
      <div className="relative flex flex-col justify-end">
        <HoverTooltip className="!-left-[7.5rem] !-top-[0.375rem]" data={{ description: 'Conversation' }}>
          <div>
            <HoverableIcon icon={<ChatBubbleUserSVG className="fill-black" />} />
            <Badge counter={data?.messageCount} className="-right-1 -top-1 p-2.5" />
          </div>
        </HoverTooltip>
        {actions[tab]}
        {sessionId === data?.chatId && state[tab]}
      </div>
    </div>
  );
};

ChatSession.propTypes = ChatSessionPropTypes;

export default ChatSession;
