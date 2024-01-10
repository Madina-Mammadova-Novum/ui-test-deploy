'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatButton } from '@/elements';
import Hydrate from '@/elements/Hydrate';
import { SCREENS } from '@/lib/constants';
import { сhatSessionServcie } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { resetChatFilter, setCollapsedChat, setOpenedChat } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatConversation, ChatModal, CollapsedChats } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';
import { useMediaQuery } from '@/utils/hooks';

const Chat = () => {
  const dispatch = useDispatch();
  const mdScreen = useMediaQuery(SCREENS.MDX);

  const token = getCookieFromBrowser('session-access-token');

  const {
    opened,
    isActive,
    newMessages,
    status,
    chats: { user },
  } = useSelector(getChatSelector);

  useEffect(() => {
    dispatch(getListOfChats());
  }, []);

  useEffect(() => {
    if (opened) document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  const handleOpen = () => dispatch(setOpenedChat(!opened));
  const handleCloseConversation = () => сhatSessionServcie.stop();

  const handleClose = async () => {
    dispatch(resetChatFilter());
    dispatch(setOpenedChat(false));
  };

  const handleCollapseConversation = () => {
    сhatSessionServcie.stop();
    dispatch(setCollapsedChat({ ...user.data, messageCount: 0 }));
  };

  useEffect(() => {
    if (mdScreen && isActive) dispatch(setOpenedChat(false));
  }, [mdScreen, isActive]);

  const activeConnection = status >= 200 && status <= 400 && token;

  return (
    activeConnection && (
      <Hydrate>
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
      </Hydrate>
    )
  );
};

export default Chat;
