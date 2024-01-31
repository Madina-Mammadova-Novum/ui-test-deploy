'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BellIcon from '@/assets/icons/BellIcon';
import { Button, Title } from '@/elements';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { resetNotifications, resetParams, setIsOpened } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationContent, NotificationControl } from '@/units';

const Notification = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { unreadCounter, isOpened } = useSelector(getNotificationsDataSelector);

  const handleOpen = () => {
    dispatch(setIsOpened(true));
  };

  const handleClose = () => {
    dispatch(setIsOpened(false));
    dispatch(resetNotifications());
    dispatch(resetParams());
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPorts());
  }, []);

  useEffect(() => {
    handleClose();
  }, [pathname]);

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
