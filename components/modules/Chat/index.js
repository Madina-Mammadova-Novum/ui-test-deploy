'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { chatService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { resetChatFilter, setCollapsedChat, setConversation, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatModal, CollapsedChats } from '@/units';
import { useMediaQuery } from '@/utils/hooks';

const Chat = () => {
  const dispatch = useDispatch();
  const mdScreen = useMediaQuery(SCREENS.MDX);

  const {
    opened,
    isActive,
    newMessagesCounter,
    chats: { user },
  } = useSelector(getChatSelector);

  useEffect(() => {
    chatService.initStatus();
  }, []);

  useEffect(() => {
    if (opened) {
      dispatch(getListOfChats());
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  const handleOpen = () => dispatch(setOpenedChat(!opened));
  const handleCloseConversation = () => chatService.disconnect();

  const handleClose = async () => {
    dispatch(resetChatFilter());
    dispatch(setOpenedChat(false));
  };

  const handleCollapseConversation = () => {
    dispatch(
      setCollapsedChat({
        chatId: user?.data?.chatId,
        name: user?.data?.vessel?.name,
        status: null,
      })
    );
    dispatch(setConversation(false));
  };

  useEffect(() => {
    if (mdScreen && isActive) dispatch(setOpenedChat(false));
  }, [mdScreen, isActive]);

  return (
    <>
      <ChatButton
        counter={newMessagesCounter}
        onClick={handleOpen}
        withCancel={false}
        className="fixed right-3 bottom-3 z-30"
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

Chat.propTypes = {};

export default Chat;
