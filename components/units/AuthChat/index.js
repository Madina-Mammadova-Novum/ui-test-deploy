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
  setChatFilter,
  setCollapsedChat,
  setConversation,
} from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const AuthChat = ({ opened, token }) => {
  const [dataByTab, setDataByTab] = useState([]);
  const mdScreen = useMediaQuery(SCREENS.MDX);

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
    chats: { active, archieved, searched, user },
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

  const handleClose = () => {
    сhatSessionService.onToggle(false);
    dispatch(resetChatFilter());
  };

  const handleMore = () => dispatch(setChatFilter({ limit: limit + limit }));

  useEffect(() => {
    if (token) {
      dispatch(getListOfChats());
      getChatNotifications();
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
      setDataByTab(archieved);
    }
  }, [tab, searched, search, active, archieved]);

  useEffect(() => {
    if (mdScreen && isActive) {
      сhatSessionService.onToggle(false);
    }
  }, [mdScreen, isActive]);

  const printChatRooms = useMemo(() => {
    return <ChatList loading={loading} tab={tab} data={dataByTab?.slice(0, limit)} />;
  }, [dataByTab, tab, loading, limit]);

  const printLoadMore = useMemo(() => {
    if (updating) {
      return (
        <div className="flex flex-col gap-y-2.5">
          <Divider />
          <p className="inline-flex mb-2.5 font-semibold py-2 w-full justify-center items-center gap-x-2.5 text-black text-xsm">
            Updating... <Loader className="h-4 w-4" />
          </p>
        </div>
      );
    }
    return <ChatLoadMoreCta tab={tab} onClick={handleMore} disabled={dataByTab?.length <= limit || loading} />;
  }, [updating, tab, dataByTab, limit, handleMore]);

  const handleCloseConversation = async () => {
    await сhatSessionService.stop();
  };

  const handleCollapseConversation = () => {
    dispatch(setConversation(false));
    dispatch(setCollapsedChat({ ...user.data, messageCount: 0 }));
  };

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
        onCloseSession={handleCloseConversation}
        onCollapseSession={handleCollapseConversation}
      />
      <CollapsedChats />
    </>
  );
};

AuthChat.propTypes = AuthChatPropTypes;

export default AuthChat;
