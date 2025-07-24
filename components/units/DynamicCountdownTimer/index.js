'use client';

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import { DynamicCountdownTimerPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';

const DynamicCountdownTimer = ({ date, autoStart = true, variant = 'primary', status }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  return mounted ? (
    <Countdown
      date={date}
      autoStart={autoStart}
      renderer={({ hours, minutes, seconds, completed }) => {
        // Handle NotStarted status first
        if (status === 'NotStarted') {
          return <span className="text-yellow">Not Started</span>;
        }

        if (completed) return <span className="text-red">Expired</span>;

        return (
          <span className={`flex items-center gap-x-1 text-red ${!autoStart ? 'opacity-50' : ''}`}>
            <ClockSVG className={`h-4 w-4 fill-red ${autoStart ? 'animate-clock-spin' : ''}`} viewBox="0 0 14 14" />{' '}
            {!!hours && `${hours}h`}
            {!!minutes && `${minutes}m`} {(variant !== 'primary' || (!hours && !minutes)) && `${seconds}s`}
          </span>
        );
      }}
    />
  ) : null;
};

DynamicCountdownTimer.propTypes = DynamicCountdownTimerPropTypes;

export default DynamicCountdownTimer;
