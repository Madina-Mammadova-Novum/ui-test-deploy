'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

/**
 * @component CountdownTimer
 * @description Displays a circular countdown timer showing days, hours, minutes, and seconds
 * @props {Date} targetDate - Target date to count down to
 */
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-black via-black/90 to-blue-dark/80 text-center shadow-xl transition-transform hover:scale-105 md:h-44 md:w-44">
            {/* Internal glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue/5 to-transparent" />

            {/* Pulsing ring */}
            <div className="absolute h-full w-full animate-pulse rounded-full border-4 border-yellow/15" />

            {/* Second ring */}
            <div className="absolute h-[90%] w-[90%] rounded-full border-2 border-yellow/20" />

            {/* Third inner ring */}
            <div className="absolute h-[76%] w-[76%] rounded-full border border-yellow/10" />

            {/* Number value */}
            <span className="relative z-10 text-6xl font-extrabold text-yellow drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-7xl">
              {unit.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="mt-4 text-sm font-semibold uppercase tracking-widest text-white md:text-base">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
};

export default CountdownTimer;
