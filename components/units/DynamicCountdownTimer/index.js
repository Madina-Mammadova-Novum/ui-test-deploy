'use client';

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import { DynamicCountdownTimerPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';

const DynamicCountdownTimer = ({ date, autoStart = true }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  return mounted ? (
    <Countdown
      date={date}
      autoStart={autoStart}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) return <span className="text-red">Expired</span>;
        return (
          <span className={`flex gap-x-1 text-red ${!autoStart && 'opacity-50'}`}>
            <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 14 14" /> {!!hours && `${hours}h`}{' '}
            {!!minutes && `${minutes}m`}
            {!hours && !minutes && `${seconds}s`}
          </span>
        );
      }}
    />
  ) : null;
};

DynamicCountdownTimer.propTypes = DynamicCountdownTimerPropTypes;

export default DynamicCountdownTimer;
