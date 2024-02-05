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
import { сhatSessionService } from '@/services/signalR';
import {
  resetChatFilter,
  resetUser,
  setChatFilter,
  setCollapsedChat,
  setConversation,
  setOpenedChat,
} from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const AuthChat = ({ user, opened }) => {
  const [dataByTab, setDataByTab] = useState([]);
  const mdScreen = useMediaQuery(SCREENS.MDX);

  const dispatch = useDispatch();

  const {
    isActive,
    tab,
    limit,
    search,
    loading,
    updating,
    totalActive,
    totalArchived,
    chats: { active, archived, searched },
  } = useSelector(getChatSelector);

  useEffect(() => {
    if (searched && search !== '') {
      setDataByTab(searched);
    } else if (tab === 'active') {
      setDataByTab(active);
    } else {
      setDataByTab(archived);
    }
  }, [tab, searched, search, active, archived]);

  useEffect(() => {
    if (mdScreen && isActive) dispatch(setOpenedChat(false));
  }, [mdScreen, isActive]);

  const handleClose = useCallback(() => {
    dispatch(resetUser());
    dispatch(resetChatFilter());
    dispatch(setOpenedChat(false));
  }, [dispatch]);

  const handleMore = () => dispatch(setChatFilter({ limit: limit + limit }));

  const printChatRooms = useMemo(() => {
    return <ChatList loading={loading} tab={tab} data={dataByTab.slice(0, limit)} />;
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
    return <ChatLoadMoreCta tab={tab} onClick={handleMore} disabled={dataByTab.length <= limit || loading} />;
  }, [updating, tab, dataByTab, limit, handleMore]);

  const handleCloseConversation = async () => {
    await сhatSessionService.stop();
  };

  const handleCollapseConversation = () => {
    dispatch(setConversation(false));
    dispatch(setCollapsedChat({ ...user, messageCount: 0 }));
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
