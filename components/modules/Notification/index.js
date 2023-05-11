import { NotificationPropTypes } from '@/lib/types';

import NotificationSVG from '@/assets/images/notification.svg';
import { HoverableIcon } from '@/elements';

const Notification = ({ numberOfNotifications }) => {
  return (
    <div className="relative">
      <HoverableIcon icon={<NotificationSVG />} />
      <div className="absolute -top-1 -right-2 w-5 h-5 rounded-[50%] bg-blue text-[10px] font-bold text-white flex items-center justify-center">
        {numberOfNotifications}
      </div>
    </div>
  );
};

Notification.propTypes = NotificationPropTypes;

export default Notification;
