import { Divider } from '@/elements';
import NotificationCardBody from '@/units/NotificationCard/NotificationCardBody';
import NotificationCardHeader from '@/units/NotificationCard/NotificationCardHeader';

const NotificationCard = ({ data = [] }) => {
  const printNotificationCard = ({ title, time, topic, url, id }) => {
    return (
      <div key={id} className="flex flex-col w-full pb-4 gap-2.5">
        <NotificationCardHeader time={time} topic={topic} />
        <NotificationCardBody message={title} url={url} urlId={id} />
        <Divider />
      </div>
    );
  };

  return data.map(printNotificationCard);
};

export default NotificationCard;
