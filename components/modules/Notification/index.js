'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BellSVG from '@/assets/images/bell.svg';
import { Button, Divider, HoverableIcon, Loader, Title } from '@/elements';
import { getNotificationsDataSelector } from '@/store/selectors';
import { NotificationControls } from '@/units';
import NotificationCard from '@/units/NotificationCard';

const Notification = () => {
  const { data, loading, total } = useSelector(getNotificationsDataSelector);

  const [modalStore, setModalStore] = useState({ isModalOpen: false });

  const { isModalOpen } = modalStore;

  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOpen = () => handleChangeState('isModalOpen', !isModalOpen);

  const printNotifications = ({ id, title, data: notifications }) => {
    return (
      <div key={id} className="flex flex-col items-center w-full px-8">
        <span className="text-gray capitalize text-xs-sm pb-4">{title}</span>
        <Divider className="w-full mb-4" />
        <NotificationCard data={notifications} />
      </div>
    );
  };

  return (
    <div>
      <Button
        buttonProps={{
          icon: {
            before: (
              <div>
                <HoverableIcon icon={<BellSVG />} />
                <div className="absolute border border-white border-solid -top-1 -right-2 px-0.5 h-5 min-w-4 rounded-base bg-blue text-xxs font-bold text-white flex items-center justify-center">
                  {total}
                </div>
              </div>
            ),
          },
        }}
        type="button"
        className="relative"
        onClick={handleOpen}
      />
      {isModalOpen && (
        <div className="absolute top-0 right-0 z-50">
          <ModalWrapper
            opened={isModalOpen}
            onClose={() => handleChangeState('isModalOpen', false)}
            containerClass="absolute z-50 !max-h-screen h-screen !w-[550px] !-left-[275px] !-translate-y-0 !top-0 !rounded-none !p-0"
          >
            <div className="flex flex-col py-8">
              <Title level="2" className="text-black px-8">
                Notifications
              </Title>
              <NotificationControls contianerClass="flex flex-col gap-y-5" />
              {loading ? <Loader className="h-8 w-8 absolute top-2/3" /> : data?.map(printNotifications)}
            </div>
          </ModalWrapper>
        </div>
      )}
    </div>
  );
};

Notification.propTypes = NotificationPropTypes;

export default Notification;
