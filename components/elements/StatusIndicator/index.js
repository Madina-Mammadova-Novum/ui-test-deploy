import { StatusIndicatorPropTypes } from '@/lib/types';

const StatusIndicator = ({ status = '', customStyles = '' }) => {
  const backgroundColor = status === 'new' ? 'bg-yellow' : 'bg-blue';

  return <span className={`w-2.5 h-2.5 rounded-full ${backgroundColor} ${customStyles}`} />;
};

StatusIndicator.propTypes = StatusIndicatorPropTypes;

export default StatusIndicator;
