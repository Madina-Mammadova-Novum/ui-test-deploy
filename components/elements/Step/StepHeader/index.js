import PropTypes from 'prop-types';

const StepHeader = ({ title, className }) => {
  return <span className={`${className} text-blue text-xs-sm font-semibold uppercase`}>{title}</span>;
};

StepHeader.defaultProps = {
  className: '',
};

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StepHeader;
