'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationContentPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationList, NotificationPlaceholder } from '@/units';
import { isReadValue } from '@/utils/helpers';

const NotificationContent = () => {
  const dispatch = useDispatch();
  const { loading, unwatchedData, watchedData, filterParams, activeTab, readedCounter, unreadedCounter } =
    useSelector(getNotificationsDataSelector);

  const [data, setData] = useState([]);

  const { take, searchValue, sortedValue } = filterParams;

  const isWatchedTab = isReadValue(activeTab);

  useEffect(() => {
    if (isWatchedTab) setData(watchedData);
    else setData(unwatchedData);
  }, [isWatchedTab, unwatchedData, watchedData]);

  const handleScroll = ({ currentTarget }) => {
    const { clientHeight, scrollHeight, scrollTop } = currentTarget;
    const trigger = scrollTop + clientHeight >= scrollHeight - 150;

    if (trigger && !loading) {
      if (searchValue !== '' || sortedValue !== 'All') return;
      if (isWatchedTab && take >= readedCounter) return;
      if (!isWatchedTab && take >= unreadedCounter) return;

      dispatch(setFilterParams({ ...filterParams, skip: take, take: take + take }));
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
