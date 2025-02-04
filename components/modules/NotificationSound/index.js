'use client';

import { useEffect, useState } from 'react';

import VolumeSVG from '@/assets/images/volume.svg';
import VolumeMuteSVG from '@/assets/images/volumeMute.svg';
import { Button } from '@/elements';

/**
 * @component NotificationSound
 * @description Toggle component for enabling/disabling notification sounds
 */
export default function NotificationSound() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Get initial state from localStorage
    const soundEnabled = localStorage.getItem('notificationSound');
    setIsSoundEnabled(soundEnabled === null ? true : soundEnabled === 'true');
  }, []);

  const toggleSound = () => {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    localStorage.setItem('notificationSound', newState.toString());
  };

  return (
    <Button
      onClick={toggleSound}
      className="flex items-center justify-center rounded-full p-1 hover:bg-gray-darker"
      aria-label={`Turn ${isSoundEnabled ? 'off' : 'on'} notification sound`}
      buttonProps={{
        icon: {
          before: isSoundEnabled ? <VolumeSVG className="fill-black" /> : <VolumeMuteSVG className="fill-black" />,
        },
      }}
    />
  );
}
