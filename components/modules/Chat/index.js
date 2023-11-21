'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { chatService } from '@/services/signalR';
import { resetChatFilter, setCollapsedChat, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatModal, CollapsedChats } from '@/units';
import { useMediaQuery } from '@/utils/hooks';

const Chat = () => {
  const dispatch = useDispatch();
  const mdScreen = useMediaQuery(SCREENS.MDX);

  const {
    opened,
    isActive,
    newMessages,
    chats: { user },
  } = useSelector(getChatSelector);

  useEffect(() => {
    if (opened) document.body.classList.add('overflow-hidden');

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
    dispatch(setCollapsedChat(user.data));

    chatService.disconnect();
  };

  useEffect(() => {
    if (mdScreen && isActive) dispatch(setOpenedChat(false));
  }, [mdScreen, isActive]);

  // const onActivate = (chat) => chatService.initChat(chat);

  // const onRemove = async ({ id }) => {
  //   dispatch(resetUser());
  //   dispatch(removeCollapsedChat(id));
  //   chatService.disconnect();
  // };

  // const handleStartConversation = ({ id, key }) => {
  //   const chat = chats[key]?.find((session) => session?.chatId === id);

  //   onRemove({ id: chat?.chatId }).then(() => {
  //     onActivate(chat);
  //     dispatch(setOpenedChat(true));
  //   });
  // };

  // const handleCloseConversation = (e, id) => {
  //   e?.stopPropagation();
  //   onRemove({ id });
  // };

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

export default Chat;
