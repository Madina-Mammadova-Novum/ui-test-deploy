import PropTypes from 'prop-types';

const StepBody = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

StepBody.defaultProps = {
  className: '',
};

StepBody.propTypes = {
  className: PropTypes.string,
};

export default StepBody;
