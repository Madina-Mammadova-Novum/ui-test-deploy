'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationContentPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { fetchMoreNotifications, fetchNotifications } from '@/store/entities/notifications/actions';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationList, NotificationPlaceholder } from '@/units';
import { isReadValue } from '@/utils/helpers';

const NotificationContent = () => {
  const dispatch = useDispatch();
  const { loading, unwatchedData, watchedData, filterParams, activeTab, readedCounter, unreadedCounter } =
    useSelector(getNotificationsDataSelector);

  const { take, triggered, searchValue, sortedValue } = filterParams;

  const isWatchedTab = isReadValue(activeTab);
  const data = isWatchedTab ? watchedData : unwatchedData;

  useEffect(() => {
    dispatch(fetchNotifications({ ...filterParams, skip: 0, take: 50, watched: isWatchedTab }));

    if (triggered) {
      if (searchValue === '' || sortedValue === 'all')
        dispatch(fetchMoreNotifications({ ...filterParams, watched: isWatchedTab }));
    }
  }, [triggered, searchValue, sortedValue]);

  const handleScroll = ({ currentTarget }) => {
    const { clientHeight, scrollHeight, scrollTop } = currentTarget;
    const watchDataCondition = watchedData.length > 0 && isWatchedTab && take <= readedCounter;
    const unwatchedDataCondition = unwatchedData.length > 0 && !isWatchedTab && take <= unreadedCounter;

    const trigger = scrollTop + clientHeight >= scrollHeight - 150;

    if (trigger) {
      if (watchDataCondition || unwatchedDataCondition) {
        if (!loading) {
          dispatch(setFilterParams({ ...filterParams, skip: take, take: take + take, triggered: true }));
        } else {
          dispatch(setFilterParams({ ...filterParams, triggered: false }));
        }
      }
    }
  };

  const printNotificationList = (notifications) => <NotificationList data={notifications} />;

  const printNotifications = useMemo(() => {
    if (loading && !data.length) return <Loader className="h-6 w-6 absolute top-2/3" />;
    if (loading && data.length > 0)
      return (
        <>
          {data.map(printNotificationList)}
          <Loader className="h-5 w-5 absolute bottom-2.5" />
        </>
      );
    if (!data.length) return <NotificationPlaceholder containerClass="mx-8" text="No notifications yet" />;
    return data.map(printNotificationList);
  }, [data, loading]);

  return (
    <div onScroll={handleScroll} className="overflow-y-auto max-h-[calc(100vh-35vh)]">
      {printNotifications}
    </div>
  );
};

NotificationContent.propTypes = NotificationContentPropTypes;

export default NotificationContent;
