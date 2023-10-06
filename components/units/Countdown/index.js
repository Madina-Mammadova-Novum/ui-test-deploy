import DynamicCountdownTimer from '../DynamicCountdownTimer';

import { CountdownPropTypes } from '@/lib/types';

const Countdown = ({ time, customStyles = '' }) => {
  return (
    <div className={`px-4 py-1 border-l-2 border-l-blue ${customStyles}`}>
      <span className="uppercase font-semibold">Countdown</span>
      <div className="flex text-xsm">
        <DynamicCountdownTimer {...time} />
      </div>
    </div>
  );
};

Countdown.propTypes = CountdownPropTypes;

export default Countdown;
