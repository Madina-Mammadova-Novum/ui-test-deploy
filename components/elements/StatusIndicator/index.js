import PropTypes from 'prop-types';

const StatusIndicator = ({ status, customStyles }) => {
  const backgroundColor = status === 'new' ? 'bg-yellow' : 'bg-blue';

  return <span className={`w-2.5 h-2.5 rounded-[50%] ${backgroundColor} ${customStyles}`} />;
};

StatusIndicator.defaultProps = {
  status: '',
  customStyles: '',
};

StatusIndicator.propTypes = {
  status: PropTypes.string,
  customStyles: PropTypes.string,
};

export default StatusIndicator;
