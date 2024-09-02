'use client';

import { NotificationAlertPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { NotificationCard } from '@/units';

const NotificationAlert = ({ handleClose, notificationData }) => {
  return (
    <div className="my-3 mb-0 ml-auto box-border flex w-max max-w-[31.875rem] justify-between gap-2.5 rounded-base border border-solid bg-gray-50 px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <NotificationCard data={notificationData} useDivider={false} handleClose={handleClose} />
      </div>
      <button type="button" onClick={handleClose}>
        <CloseSVG className="fill-black" />
      </button>
    </div>
  );
};

NotificationAlert.propTypes = NotificationAlertPropTypes;

export default NotificationAlert;
