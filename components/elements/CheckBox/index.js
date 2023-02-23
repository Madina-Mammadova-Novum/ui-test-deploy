import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBox = ({ customStyles, labelStyles, onChange, label, name, register, children }) => {
  return (
    <div className="flex gap-2.5 items-center">
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        className={classnames('w-5 h-5', customStyles)}
        {...register(name)}
      />
      {label && (
        <label htmlFor={name} className={labelStyles}>
          {label}
          {children}
        </label>
      )}
    </div>
  );
};

CheckBox.defaultProps = {
  customStyles: '',
  labelStyles: '',
  value: null,
  label: '',
  name: null,
  onChange: () => {},
  register: () => {},
};

CheckBox.propTypes = {
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  value: PropTypes.bool,
};

export default CheckBox;
