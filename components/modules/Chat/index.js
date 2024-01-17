'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { ChatButton } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { сhatSessionService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { resetChatFilter, setCollapsedChat, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatModal, CollapsedChats } from '@/units';
import { useMediaQuery } from '@/utils/hooks';

const Chat = ({ token }) => {
  const dispatch = useDispatch();
  const mdScreen = useMediaQuery(SCREENS.MDX);

  const {
    opened,
    isActive,
    newMessages,
    chats: { user },
  } = useSelector(getChatSelector);

  useEffect(() => {
    dispatch(getListOfChats());
  }, [token]);

  useEffect(() => {
    if (opened) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  const handleOpen = () => dispatch(setOpenedChat(!opened));
  const handleCloseConversation = () => сhatSessionService.stop();

  const handleClose = async () => {
    dispatch(resetChatFilter());
    dispatch(setOpenedChat(false));
  };

  const handleCollapseConversation = () => {
    handleCloseConversation();
    dispatch(setCollapsedChat({ ...user.data, messageCount: 0 }));
  };

  useEffect(() => {
    if (mdScreen && isActive) {
      dispatch(setOpenedChat(false));
    }
  }, [mdScreen, isActive]);

  return (
    <>
      <ChatButton
        counter={newMessages}
        onClick={handleOpen}
        className="fixed right-3 bottom-3 z-30"
        variant="default"
      />
      <ChatModal isOpened={opened} onClose={handleClose} />
      <ChatConversation
        isOpened={isActive}
        isMediumScreen={mdScreen}
        onCloseSession={handleCloseConversation}
        onCollapseSession={handleCollapseConversation}
      />
      <CollapsedChats />
    </>
  );
};

Chat.propTypes = {
  token: PropTypes.string,
};

export default Chat;
