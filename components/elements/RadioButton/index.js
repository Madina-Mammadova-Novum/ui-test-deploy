import classnames from 'classnames';
import PropTypes from 'prop-types';

const RadioButton = ({ customStyles, checked, onChange }) => {
  return <input checked={checked} onChange={onChange} type="radio" className={classnames('w-5 h-5', customStyles)} />;
};

RadioButton.defaultProps = {
  customStyles: '',
  checked: false,
  onChange: () => {},
};

RadioButton.propTypes = {
  customStyles: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
