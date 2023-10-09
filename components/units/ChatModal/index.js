'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatModalPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
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

  const handleMore = () => dispatch(setChatFilter({ limit: limit + limit }));

  const printChatRooms = useMemo(() => {
    return <ChatList data={dataByTab} />;
  }, [dataByTab, limit]);

  return (
    isOpened && (
      <div className="fixed bg-white shadow-xmd border border-gray-light right-24 bottom-6 h-auto w-[360px] z-50 rounded-base">
        <ChatModalHeader onClose={onClose} />
        <ChatControl tab={tab} search={search} activeCounter={totalActive} archivedCounter={totalArchived} />
        <Divider />
        <div className="relative min-h-[320px]">{printChatRooms}</div>
        <ChatLoadMoreCta onClick={handleMore} disabled={active?.length <= limit} />
      </div>
    )
  );
};

ChatModal.propTypes = ChatModalPropTypes;

export default ChatModal;
