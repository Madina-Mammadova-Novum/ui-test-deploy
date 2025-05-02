'use client';

import { useState } from 'react';

import { Divider } from '@/elements';
import NotificationCardBody from '@/units/NotificationCard/NotificationCardBody';
import NotificationCardHeader from '@/units/NotificationCard/NotificationCardHeader';
import { extractTimeFromDate } from '@/utils/helpers';

const NotificationCard = ({ data = [], useDivider = true, handleClose = () => {} }) => {
  const [disabled, setDisabled] = useState(false);

  const printNotificationCard = ({ title, time, topic, url, id, watched, isSignal = false }) => {
    const nextTime = extractTimeFromDate(time);

    return (
      <div key={id} className="group flex w-full flex-col gap-2.5 pb-4">
        <NotificationCardHeader time={nextTime} topic={topic} />
        <NotificationCardBody
          message={title}
          url={url}
          urlId={id}
          disabled={disabled}
          setDisabled={setDisabled}
          handleClose={handleClose}
          watched={watched}
          isSignal={isSignal}
        />
        {useDivider && <Divider />}
      </div>
    );
  };

  return data.map(printNotificationCard);
};

export default NotificationCard;
