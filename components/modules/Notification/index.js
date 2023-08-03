'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BellIcon from '@/assets/icons/BellIcon';
import { Button, Loader, Title } from '@/elements';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationControls, NotificationList } from '@/units';

const Notification = () => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const { data, loading, unread, filterParams } = useSelector(getNotificationsDataSelector);

  const handleOpen = () => setIsOpened(!isOpened);

  const handleClose = () => setIsOpened(false);

  useEffect(() => {
    dispatch(fetchNotifications(filterParams));
  }, [dispatch, filterParams, isOpened]);

  const printNotificationList = (notifications) => <NotificationList data={notifications} />;

  const printNotifications = useMemo(() => {
    return loading ? <Loader className="h-8 w-8 absolute top-2/3" /> : data?.map(printNotificationList);
  }, [data, loading]);

  return (
    <div>
      <Button
        type="button"
        className="relative"
        onClick={handleOpen}
        buttonProps={{
          icon: { before: <BellIcon counter={unread} /> },
        }}
      />
      {isOpened && (
        <div className="absolute top-0 right-0 z-50">
          <ModalWrapper
            opened={isOpened}
            onClose={handleClose}
            containerClass="absolute z-50 !max-h-screen h-screen !w-[550px] !-left-[275px] !-translate-y-0 !top-0 !rounded-none !p-0"
          >
            <div className="flex flex-col py-8">
              <Title level="2" className="text-black px-8">
                Notifications
              </Title>
              <NotificationControls contianerClass="flex flex-col gap-y-5" />
              {printNotifications}
            </div>
          </ModalWrapper>
        </div>
      )}
    </div>
  );
};

Notification.propTypes = NotificationPropTypes;

export default Notification;
