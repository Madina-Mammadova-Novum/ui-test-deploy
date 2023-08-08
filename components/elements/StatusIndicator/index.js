import { useMemo } from 'react';

import { StatusIndicatorPropTypes } from '@/lib/types';

const StatusIndicator = ({ status = '', customStyles = '' }) => {
  const backgroundColor = useMemo(() => {
    switch (status) {
      case 'New offer':
        return 'bg-yellow';
      case 'Counteroffer':
        return 'bg-blue';
      case 'Confirmed':
      case 'Active':
        return 'bg-green';
      case 'Inactive':
      default:
        return 'bg-gray';
    }
  }, [status]);

  return <span className={`block w-2.5 h-2.5 rounded-full ${backgroundColor} ${customStyles}`} />;
};

StatusIndicator.propTypes = StatusIndicatorPropTypes;

export default StatusIndicator;
