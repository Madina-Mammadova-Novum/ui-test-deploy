'use client';

import { useState } from 'react';

import { Divider } from '@/elements';
import NotificationCardBody from '@/units/NotificationCard/NotificationCardBody';
import NotificationCardHeader from '@/units/NotificationCard/NotificationCardHeader';
import { extractTimeFromDate } from '@/utils/helpers';

const NotificationCard = ({ data = [] }) => {
  const [disabled, setDisabled] = useState(false);

  const printNotificationCard = ({ title, time, topic, url, id }) => {
    const nextTime = extractTimeFromDate(time);

    return (
      <div key={id} className="flex flex-col w-full pb-4 gap-2.5">
        <NotificationCardHeader time={nextTime} topic={topic} />
        <NotificationCardBody message={title} url={url} urlId={id} disabled={disabled} setDisabled={setDisabled} />
        <Divider />
      </div>
    );
  };

  return data.map(printNotificationCard);
};

export default NotificationCard;
