import { NotificationPropTypes } from '@/lib/types';

import NotificationSVG from '@/assets/images/notification.svg';
import { HoverableIcon } from '@/elements';

const Notification = ({ numberOfNotifications }) => {
  return (
    <div className="relative">
      <HoverableIcon icon={<NotificationSVG />} />
      <div className="absolute border border-white border-solid -top-1 -right-2 px-0.5 h-5 min-w-[20px] rounded-base bg-blue text-xxs font-bold text-white flex items-center justify-center">
        {numberOfNotifications}
      </div>
    </div>
  );
};

Notification.propTypes = NotificationPropTypes;

export default Notification;
