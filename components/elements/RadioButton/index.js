import classnames from 'classnames';
import PropTypes from 'prop-types';

const RadioButton = ({ customStyles }) => {
  return <input type="radio" className={classnames('w-5 h-5', customStyles)} />;
};

RadioButton.defaultProps = {
  customStyles: '',
};

RadioButton.propTypes = {
  customStyles: PropTypes.string,
};

export default RadioButton;
