'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { debounce } from 'lodash';

import ChatSearch from './ChatSearch';
import ChatSupport from './ChatSupport';
import ChatTabs from './ChatTabs';

import { ChatControlPropTypes } from '@/lib/types';

import { searchedData, setChatFilter } from '@/store/entities/chat/slice';
import { getUserDataSelector } from '@/store/selectors';

const ChatControl = ({ tab, search, activeCounter, archivedCounter, loading }) => {
  const dispatch = useDispatch();

  const { role } = useSelector(getUserDataSelector);

  const handleTab = ({ target: { value } }) => dispatch(setChatFilter({ tabValue: value }));
  const handleSearch = ({ target: { value } }) => dispatch(setChatFilter({ searchValue: value }));

  useEffect(() => {
    const debounceDispatch = debounce((value) => {
      dispatch(searchedData({ value: value.toLowerCase(), key: tab }));
    }, 300);

    if (search) debounceDispatch(search);

    return () => {
      debounceDispatch.cancel();
    };
  }, [search]);

  return (
    <div className="flex flex-col gap-y-3 px-5 pt-5 pb-3">
      <ChatTabs
        loading={loading}
        activeTab={tab}
        activeCounter={activeCounter}
        archivedCounter={archivedCounter}
        onClick={handleTab}
        containerClass="flex justify-center"
      />
      <ChatSearch value={search} role={role} onChange={handleSearch} loading={loading} />
      <ChatSupport title="Help Center" description="Do you have any problems?" loading={loading} />
    </div>
  );
};

ChatControl.propTypes = ChatControlPropTypes;

export default ChatControl;
