import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBox = ({ customStyles, onChange }) => {
  return <input onChange={onChange} type="checkbox" className={classnames('w-5 h-5', customStyles)} />;
};

CheckBox.defaultProps = {
  customStyles: '',
  onChange: () => {},
};

CheckBox.propTypes = {
  customStyles: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckBox;
