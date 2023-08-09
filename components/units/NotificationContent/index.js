'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationContentPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationList, NotificationPlaceholder } from '@/units';

const NotificationContent = () => {
  const dispatch = useDispatch();
  const { loading, unwatchedData, watchedData, filterParams, readed, unread } =
    useSelector(getNotificationsDataSelector);

  const { activeTab, take, searchValue, sortedValue, watched } = filterParams;

  const data = activeTab === 'read' ? watchedData : unwatchedData;

  const handleScroll = ({ currentTarget }) => {
    const { clientHeight, scrollHeight, scrollTop } = currentTarget;
    const trigger = scrollTop + clientHeight >= scrollHeight - 150;

    if (trigger && !loading) {
      if (searchValue !== '' || sortedValue !== 'All') return;
      if (watched && take >= readed) return;
      if (!watched && take >= unread) return;

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
