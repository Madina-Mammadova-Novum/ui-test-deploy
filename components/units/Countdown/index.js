import PropTypes from 'prop-types';

import ClockSVG from '@/assets/images/clock.svg';

const Countdown = ({ time, customStyles }) => {
  return (
    <div className={`px-4 py-1 border-l-2 border-l-blue ${customStyles}`}>
      <span className="uppercase font-semibold">countdown</span>
      <div className="text-red flex">
        <ClockSVG className="fill-red" />
        <span className="ml-1.5 text-xsm">{time}</span>
      </div>
    </div>
  );
};

Countdown.defaultProps = {
  customStyles: '',
};

Countdown.propTypes = {
  time: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
};

export default Countdown;
