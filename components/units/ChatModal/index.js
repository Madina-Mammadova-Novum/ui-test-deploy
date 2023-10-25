'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatModalPropTypes } from '@/lib/types';

import { Divider, Loader } from '@/elements';
import { setChatFilter } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';
import { ChatControl, ChatList, ChatLoadMoreCta, ChatModalHeader } from '@/units';

const ChatModal = ({ isOpened, onClose }) => {
  const [dataByTab, setDataByTab] = useState([]);

  const dispatch = useDispatch();

  const {
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

    return () => {
      dispatch(setChatFilter({ limit: 3 }));
    };
  }, [tab, searched, search, active, archived]);

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
    return <ChatLoadMoreCta tab={tab} onClick={handleMore} disabled={dataByTab.length <= limit} />;
  }, [updating, tab, dataByTab, limit, handleMore]);

  return (
    isOpened && (
      <div className="fixed bg-white shadow-xmd border border-gray-light right-24 bottom-6 h-auto w-[360px] z-50 rounded-base">
        <ChatModalHeader onClose={onClose} />
        <ChatControl tab={tab} search={search} activeCounter={totalActive} archivedCounter={totalArchived} />
        <Divider />
        <div className="relative min-h-[320px]">{printChatRooms}</div>
        {printLoadMore}
      </div>
    )
  );
};

ChatModal.propTypes = ChatModalPropTypes;

export default ChatModal;
