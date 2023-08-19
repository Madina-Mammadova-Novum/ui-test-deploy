'use client';

import { useDispatch, useSelector } from 'react-redux';

import ChatSearch from './ChatSearch';
import ChatSupport from './ChatSupport';
import ChatTabs from './ChatTabs';

import { setChatFilter } from '@/store/entities/chat/slice';
import { getChatSelector } from '@/store/selectors';

const ChatControl = () => {
  const dispatch = useDispatch();

  const { search, tab } = useSelector(getChatSelector);

  const handleTab = ({ target: { value } }) => dispatch(setChatFilter({ tabValue: value }));
  const handleSearch = ({ target: { value } }) => dispatch(setChatFilter({ searchValue: value }));

  return (
    <div className="flex flex-col gap-y-3 px-5 pt-5 pb-3">
      <ChatTabs
        activeCounter={0}
        archivedCounter={0}
        activeTab={tab}
        onClick={handleTab}
        containerClass="flex justify-center"
      />
      <ChatSearch value={search} onChange={handleSearch} />
      <ChatSupport title="Help Center" description="Do you have any problems?" />
    </div>
  );
};

export default ChatControl;
