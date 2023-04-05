import PropTypes from 'prop-types';

const FieldsetContentWrapper = ({ children, className }) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

FieldsetContentWrapper.propTypes = {
  className: PropTypes.string,
};

export default FieldsetContentWrapper;
