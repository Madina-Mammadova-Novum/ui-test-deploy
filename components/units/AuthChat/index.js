'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatControl from '../ChatControl';
import ChatConversation from '../ChatConversation';
import ChatList from '../ChatList';
import ChatModal from '../ChatModal';
import ChatLoadMoreCta from '../ChatModal/ChatLoadMoreCta';
import CollapsedChats from '../CollapsedChats';

import { AuthChatPropTypes } from '@/lib/types';

import { Divider, Loader } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { chatNotificationService, сhatSessionService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import {
  messageAlert,
  resetChatFilter,
  resetUser,
  setChatFilter,
  setCollapsedChat,
  setConversation,
  setOpenedChat,
} from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const AuthChat = ({ opened, token }) => {
  const [dataByTab, setDataByTab] = useState([]);
  const smScreen = useMediaQuery(SCREENS.SM);
  const mdScreen = useMediaQuery(SCREENS.SMD);

  const dispatch = useDispatch();

  const {
    tab,
    limit,
    search,
    loading,
    updating,
    isActive,
    totalActive,
    totalArchived,
    chats: { active, archived, searched, user },
  } = useSelector(getAuthChatSelector);

  const getChatNotifications = async () => {
    await chatNotificationService.init({ token, key: user?.data?.key });
  };

  const markMessagesAsRead = useCallback(async () => {
    const messageIds = user?.messages?.flatMap((item) => item.data.map((entry) => entry.id)) || [];

    if (messageIds.length > 0) {
      for (const id of messageIds) {
        // eslint-disable-next-line no-await-in-loop
        сhatSessionService.readMessage({ id });
      }
    }
  }, [user?.messages]);

  const handleMore = () => dispatch(setChatFilter({ limit: limit + limit }));

  const handleClose = () => {
    dispatch(setOpenedChat(!opened));
    dispatch(resetChatFilter());
  };

  const handleCloseConversation = () => {
    dispatch(resetUser());
    сhatSessionService.stop();
  };

  const handleCollapseConversation = () => {
    dispatch(setOpenedChat(true));
    dispatch(setConversation(false));
    dispatch(setCollapsedChat({ ...user.data, messageCount: 0 }));
  };

  useEffect(() => {
    if (token) {
      getChatNotifications();
      dispatch(getListOfChats());
    }
  }, [token]);

  useEffect(() => {
    chatNotificationService.onToggle(isActive);

    if (isActive) {
      dispatch(messageAlert({ chatId: user?.data?.chatId, messageCount: 0 }));
      markMessagesAsRead();
    }
  }, [isActive]);

  useEffect(() => {
    if (searched && search !== '') {
      setDataByTab(searched);
    } else if (tab === 'active') {
      setDataByTab(active);
    } else {
      setDataByTab(archived);
    }
  }, [tab, searched, search, active, archived]);

  const printChatRooms = useMemo(() => {
    return <ChatList loading={loading} tab={tab} data={dataByTab?.slice(0, limit)} />;
  }, [dataByTab, tab, loading, limit]);

  const printLoadMore = useMemo(() => {
    if (updating) {
      return (
        <div className="flex flex-col gap-y-2.5">
          <Divider />
          <div className="mb-2.5 inline-flex w-full items-center justify-center gap-x-2.5 py-2 text-xsm font-semibold text-black">
            Updating... <Loader className="h-4 w-4" />
          </div>
        </div>
      );
    }
    return <ChatLoadMoreCta tab={tab} onClick={handleMore} disabled={dataByTab?.length <= limit || loading} />;
  }, [updating, tab, dataByTab, limit, handleMore]);

  return (
    <>
      <ChatModal isOpened={opened} onClose={handleClose}>
        <ChatControl
          tab={tab}
          search={search}
          loading={loading}
          activeCounter={totalActive}
          archivedCounter={totalArchived}
        />
        <Divider />
        <div className="relative min-h-[320px]">{printChatRooms}</div>
        {printLoadMore}
      </ChatModal>
      <ChatConversation
        isOpened={isActive}
        isMediumScreen={mdScreen}
        isSmallScreen={smScreen}
        onCloseSession={handleCloseConversation}
        onCollapseSession={handleCollapseConversation}
        isChatModalOpened={opened}
      />
      <CollapsedChats />
    </>
  );
};

AuthChat.propTypes = AuthChatPropTypes;

export default AuthChat;
