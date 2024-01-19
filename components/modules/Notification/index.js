'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BellIcon from '@/assets/icons/BellIcon';
import { Button, Title } from '@/elements';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { resetNotifications, resetParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationContent, NotificationControl } from '@/units';

const Notification = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { unreadCounter, filterParams } = useSelector(getNotificationsDataSelector);

  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(resetParams());
    setIsOpened(true);
  };

  const handleClose = () => {
    dispatch(resetNotifications());
    setIsOpened(false);
  };

  useEffect(() => {
    dispatch(fetchNotifications(filterParams));
  }, [filterParams]);

  return (
    <>
      <Button
        type="button"
        className="relative"
        onClick={handleOpen}
        buttonProps={{ icon: { before: <BellIcon counter={unreadCounter} /> } }}
      />
      {isOpened && (
        <div className="absolute top-0 right-0 z-50">
          <ModalWrapper
            opened={isOpened}
            onClose={handleClose}
            containerClass="absolute z-50 !overflow-hidden !max-h-screen h-screen !w-[530px] !-left-[265px] !-translate-y-0 !top-0 !rounded-none !p-0"
          >
            <div className="flex !overflow-y-hidden flex-col py-8 h-full">
              <Title level="2" className="text-black px-8">
                Notifications
              </Title>
              <NotificationControl />
              <NotificationContent />
            </div>
          </ModalWrapper>
        </div>
      )}
    </>
  );
};

Notification.propTypes = NotificationPropTypes;

export default Notification;
