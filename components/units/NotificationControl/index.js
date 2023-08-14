'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationControlPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { readAllNotifications } from '@/store/entities/notifications/actions';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import NotificationFilter from '@/units/NotificationControl/NotificationFilter';
import NotificationSearch from '@/units/NotificationControl/NotificationSearch';
import NotificationTabs from '@/units/NotificationControl/NotificationTabs';
import { isReadValue } from '@/utils/helpers';

const NotificationControl = () => {
  const dispatch = useDispatch();
  const [disabled, setIsDisabled] = useState(false);

  const {
    noUnreadedMessages,
    noReadedMessages,
    filterParams: { sortedValue, searchValue, activeTab },
  } = useSelector(getNotificationsDataSelector);

  const isWatchedTab = isReadValue(activeTab);

  useEffect(() => {
    if (isWatchedTab && noReadedMessages) setIsDisabled(true);
    if (!isWatchedTab && noUnreadedMessages) setIsDisabled(true);

    return () => {
      setIsDisabled(false);
    };
  }, [isWatchedTab, noReadedMessages, noUnreadedMessages]);

  const handleSearch = ({ target: { value } }) => dispatch(setFilterParams({ searchValue: value, skip: 0, take: 50 }));
  const handleFilter = ({ value }) => dispatch(setFilterParams({ sortedValue: value, skip: 0, take: 50 }));
  const handleTab = ({ target: { value } }) =>
    dispatch(setFilterParams({ activeTab: value, watched: isReadValue(value), skip: 0, take: 50 }));

  const handleReadAll = () => dispatch(readAllNotifications());

  return (
    <div className="flex flex-col gap-y-5 h-[25vh]">
      <NotificationSearch value={searchValue} onChange={handleSearch} containerClass="px-8 pt-5" disabled={disabled} />
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
