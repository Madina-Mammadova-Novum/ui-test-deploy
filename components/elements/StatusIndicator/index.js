import { useMemo } from 'react';

import { StatusIndicatorPropTypes } from '@/lib/types';

const StatusIndicator = ({ status = '', customStyles = '' }) => {
  const backgroundColor = useMemo(() => {
    switch (status) {
      case 'Deletion Requested':
      case 'Delete requested by Vessel Owner':
      case 'Delete requested by Charterer':
      case 'New offer':
        return 'bg-yellow';
      case 'Counteroffer':
        return 'bg-blue';
      case 'PendingRequest':
      case 'Update Requested':
        return 'bg-blue';
      case 'Confirmed':
      case 'Active':
        return 'bg-green';
      case 'Failed':
        return 'bg-red';
      case 'Inactive':
      default:
        return 'bg-gray';
    }
  }, [status]);

  return <span className={`block h-2.5 w-2.5 rounded-full ${backgroundColor} ${customStyles}`} />;
};

StatusIndicator.propTypes = StatusIndicatorPropTypes;

export default StatusIndicator;
