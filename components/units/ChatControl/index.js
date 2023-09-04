'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';

import ChatSearch from './ChatSearch';
import ChatSupport from './ChatSupport';
import ChatTabs from './ChatTabs';

import { ChatControlPropTypes } from '@/lib/types';

import { searchedData, setChatFilter } from '@/store/entities/chat/slice';

const ChatControl = ({ tab, search, activeCounter, archivedCounter }) => {
  const dispatch = useDispatch();

  const handleTab = ({ target: { value } }) => dispatch(setChatFilter({ tabValue: value }));
  const handleSearch = ({ target: { value } }) => dispatch(setChatFilter({ searchValue: value }));

  useEffect(() => {
    const debounceDispatch = debounce((value) => {
      dispatch(searchedData(value));
    }, 300);

    if (search) debounceDispatch(search);

    return () => {
      debounceDispatch.cancel();
    };
  }, [search]);

  return (
    <div className="flex flex-col gap-y-3 px-5 pt-5 pb-3">
      <ChatTabs
        activeTab={tab}
        activeCounter={activeCounter}
        archivedCounter={archivedCounter}
        onClick={handleTab}
        containerClass="flex justify-center"
      />
      <ChatSearch value={search} onChange={handleSearch} />
      <ChatSupport title="Help Center" description="Do you have any problems?" />
    </div>
  );
};

ChatControl.propTypes = ChatControlPropTypes;

export default ChatControl;
