import { NotificationListPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { NotificationCard } from '@/units';

const NotificationList = ({ data }) => {
  const { id, title, data: notifications } = data;

  return (
    <div key={id} className="flex flex-col items-center w-full px-8">
      <span className="text-gray capitalize text-xs-sm pb-4">{title}</span>
      <Divider className="w-full mb-4" />
      <NotificationCard data={notifications} />
    </div>
  );
};

NotificationList.propTypes = NotificationListPropTypes;

export default NotificationList;
