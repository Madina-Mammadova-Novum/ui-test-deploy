import { CountdownPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';

const Countdown = ({ time, customStyles = '' }) => {
  return (
    <div className={`px-4 py-1 border-l-2 border-l-blue ${customStyles}`}>
      <span className="uppercase font-semibold">Countdown</span>
      <div className="flex">
        <ClockSVG className="fill-red" />
        <span className="ml-1.5 text-xsm text-red">{time}</span>
      </div>
    </div>
  );
};

Countdown.propTypes = CountdownPropTypes;

export default Countdown;
