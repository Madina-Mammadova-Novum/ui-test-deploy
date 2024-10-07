'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { debounce } from 'lodash';

import { NotificationControlPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { readAllNotifications } from '@/store/entities/notifications/actions';
import { resetNotifications, setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import NotificationFilter from '@/units/NotificationControl/NotificationFilter';
import NotificationSearch from '@/units/NotificationControl/NotificationSearch';
import NotificationTabs from '@/units/NotificationControl/NotificationTabs';
import { isReadValue } from '@/utils/helpers';

const NotificationControl = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [disabled, setIsDisabled] = useState(false);

  const {
    loading,
    noUnreadMessages,
    noReadMessages,
    filterParams: { sortedValue, activeTab },
  } = useSelector(getNotificationsDataSelector);

  const isWatchedTab = isReadValue(activeTab);

  useEffect(() => {
    if (loading) {
      setIsDisabled(true);
    } else if ((isWatchedTab && noReadMessages) || (!isWatchedTab && noUnreadMessages)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isWatchedTab, noReadMessages, noUnreadMessages, loading]);

  useEffect(() => {
    const debounceDispatch = debounce((value) => {
      dispatch(setFilterParams({ searchValue: value?.toLowerCase(), skip: 0, take: 50 }));
    }, 1000);

    if (search) {
      debounceDispatch(search);
    } else {
      dispatch(setFilterParams({ searchValue: '', skip: 0, take: 50 }));
    }

    return () => {
      debounceDispatch.cancel();
    };
  }, [search]);

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleFilter = (options) => {
    dispatch(setFilterParams({ sortedValue: options.map(({ value }) => value), skip: 0, take: 50 }));
  };

  const handleTab = ({ target: { value } }) => {
    dispatch(resetNotifications());
    dispatch(setFilterParams({ activeTab: value, watched: isReadValue(value), skip: 0, take: 50 }));
  };

  const handleReadAll = () => dispatch(readAllNotifications());

  return (
    <div className="flex h-[25vh] flex-col gap-y-5">
      <NotificationSearch value={search} onChange={handleSearch} containerClass="px-8 pt-5" disabled={disabled} />
      <NotificationTabs
        activeTab={activeTab}
        onClick={handleReadAll}
        onChange={handleTab}
        containerClass="px-8 flex justify-between"
      />
      <Divider className="w-full" />
      <NotificationFilter containerClass="px-8 pb-5" value={sortedValue} onChange={handleFilter} disabled={disabled} />
    </div>
  );
};

NotificationControl.propTypes = NotificationControlPropTypes;

export default NotificationControl;
