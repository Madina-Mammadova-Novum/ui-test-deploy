import DynamicCountdownTimer from '../DynamicCountdownTimer';

import { CountdownPropTypes } from '@/lib/types';

const Countdown = ({ time, customStyles = '' }) => {
  return (
    <div className={`border-l-2 border-l-blue px-4 py-1 ${customStyles}`}>
      <span className="font-semibold uppercase">Countdown</span>
      <div className="flex text-xsm">
        <DynamicCountdownTimer {...time} />
      </div>
    </div>
  );
};

Countdown.propTypes = CountdownPropTypes;

export default Countdown;
