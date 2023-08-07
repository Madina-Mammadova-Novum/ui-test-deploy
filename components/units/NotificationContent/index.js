import { NotificationContentPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { NotificationList, NotificationPlaceholder } from '@/units';

const NotificationContent = ({ data, isLoading, containerClass }) => {
  if (isLoading) return <Loader className="h-8 w-8 absolute top-2/3" />;
  if (!data.length) return <NotificationPlaceholder containerClass="mx-8" text="No notifications yet" />;

  const printNotificationList = (notifications) => <NotificationList data={notifications} />;

  return (
    <div onScroll={({ currentTarget }) => currentTarget} className={containerClass}>
      {data.map(printNotificationList)}
    </div>
  );
};

NotificationContent.propTypes = NotificationContentPropTypes;

export default NotificationContent;
