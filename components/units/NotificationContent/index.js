'use client';

import { Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationContentPropTypes } from '@/lib/types';

import { Loader, NotificationLoader } from '@/elements';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationList, NotificationPlaceholder } from '@/units';

const NotificationContent = () => {
  const dispatch = useDispatch();
  const { loading, unwatchedData, watchedData, filterParams, readedCounter, unreadCounter } =
    useSelector(getNotificationsDataSelector);

  const { take, watched, searchValue, sortedValue } = filterParams;

  const data = useMemo(() => {
    return watched ? watchedData : unwatchedData;
  }, [watched, watchedData, unwatchedData]);

  const handleScroll = ({ currentTarget }) => {
    if (loading && !data.length) return;

    const { clientHeight, scrollHeight, scrollTop } = currentTarget;
    const trigger = scrollTop + clientHeight >= scrollHeight - 150;

    const watchedCondtion = searchValue !== '' || sortedValue !== 'all' || take >= readedCounter;
    const unwatchedCondtion = searchValue !== '' || sortedValue !== 'all' || take >= unreadCounter;

    if (trigger && !loading) {
      if (watched && watchedCondtion) return;
      if (!watched && unwatchedCondtion) return;

      dispatch(setFilterParams({ ...filterParams, skip: 0, take: take + take }));
    }
  };

  const printNotificationList = (notifications, index) => (
    <Fragment key={index}>
      <NotificationList data={notifications} />
    </Fragment>
  );

  const printNotifications = useMemo(() => {
    if (loading && !data.length) return <NotificationLoader quantity={5} />;
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
