import { NotificationListPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { NotificationCard } from '@/units';

const NotificationList = ({ data }) => {
  const { title, data: notifications } = data;

  return (
    <div className="flex w-full flex-col items-center px-8">
      <span className="pb-4 text-xs-sm capitalize text-gray">{title}</span>
      <Divider className="mb-4 w-full" />
      <NotificationCard data={notifications} />
    </div>
  );
};

NotificationList.propTypes = NotificationListPropTypes;

export default NotificationList;
