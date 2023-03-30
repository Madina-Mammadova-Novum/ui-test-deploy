import PropTypes from 'prop-types';

const Label = ({ className, children }) => {
  return <span className={`${className} uppercase text-gray font-semibold`}>{children}</span>;
};

Label.propTypes = {
  className: PropTypes.string,
};

export default Label;
