import PropTypes from 'prop-types';

import { RadioButton } from '@/elements';

const RadioWithText = ({ text }) => {
  return (
    <div className="flex items-center">
      <RadioButton />
      <span className="ml-2.5 text-xsm">{text}</span>
    </div>
  );
};

RadioWithText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RadioWithText;
