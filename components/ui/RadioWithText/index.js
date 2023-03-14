import PropTypes from 'prop-types';

import { RadioButton } from '@/elements';

const RadioWithText = ({ text, checked, customStyles, onChange }) => {
  return (
    <div className={`flex ${customStyles}`}>
      <RadioButton checked={checked} onChange={onChange} />
      <span className="ml-2.5 text-xsm">{text}</span>
    </div>
  );
};

RadioWithText.defaultProps = {
  checked: false,
  customStyles: '',
  onChange: () => {},
};

RadioWithText.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  customStyles: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioWithText;
