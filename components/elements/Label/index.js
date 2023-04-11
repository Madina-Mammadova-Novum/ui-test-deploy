import PropTypes from 'prop-types';

const Label = ({ children, className, name = '' }) => {
  return (
    <label htmlFor={name} className={`${className} uppercase text-gray font-semibold`}>
      {children}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Label;
