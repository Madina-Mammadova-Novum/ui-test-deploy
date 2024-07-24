'use client';

import { NotificationAlertPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { NotificationCard } from '@/units';

const NotificationAlert = ({ handleClose, notificationData }) => {
  return (
    <div className="box-border ml-auto mb-0 w-max my-3 px-4 py-2.5 gap-2.5 flex justify-between border border-solid rounded-base bg-gray-50 max-w-[31.875rem]">
      <div className="flex items-center gap-2.5">
        <NotificationCard data={notificationData} useDivider={false} />
      </div>
      <button type="button" onClick={handleClose}>
        <CloseSVG className="fill-black" />
      </button>
    </div>
  );
};

NotificationAlert.propTypes = NotificationAlertPropTypes;

export default NotificationAlert;
