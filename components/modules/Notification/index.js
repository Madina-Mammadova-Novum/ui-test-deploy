'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BellIcon from '@/assets/icons/BellIcon';
import { Button, Title } from '@/elements';
import { globalNotificationService } from '@/services/signalR';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { resetNotifications, resetParams, setIsOpened } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationContent, NotificationControl } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';

const Notification = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const token = getCookieFromBrowser('session-access-token');

  const { unreadCounter, isOpened, filterParams } = useSelector(getNotificationsDataSelector);

  const handleOpen = () => {
    dispatch(setIsOpened(true));
  };

  const handleClose = () => {
    dispatch(setIsOpened(false));
    dispatch(resetNotifications());
    dispatch(resetParams());
  };

  const initNotifications = async () => {
    await globalNotificationService.init({ token });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  useEffect(() => {
    if (token) {
      initNotifications();
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchNotifications(filterParams));
  }, [filterParams, isOpened]);

  return (
    <>
      <Button
        type="button"
        className="relative"
        onClick={handleOpen}
        buttonProps={{ icon: { before: <BellIcon counter={unreadCounter} /> } }}
      />
      {isOpened && (
        <div className="fixed top-0 right-0 z-30">
          <ModalWrapper
            opened={isOpened}
            onClose={handleClose}
            containerClass="absolute z-50 !overflow-hidden !max-h-screen h-screen !w-[530px] !-left-[265px] !-translate-y-0 !top-0 !rounded-none !p-0 z-50"
          >
            <div className="flex !overflow-y-hidden flex-col py-8 h-full" ref={ref}>
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
