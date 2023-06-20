import { useMemo } from 'react';

import { StatusIndicatorPropTypes } from '@/lib/types';

const StatusIndicator = ({ status = '', customStyles = '' }) => {
  const backgroundColor = useMemo(() => {
    switch (status) {
      case 'New offer':
        return 'yellow';
      case 'Counteroffer':
        return 'blue';
      default:
        return 'gray';
    }
  }, [status]);

  return <span className={`block w-2.5 h-2.5 rounded-full bg-${backgroundColor} ${customStyles}`} />;
};

StatusIndicator.propTypes = StatusIndicatorPropTypes;

export default StatusIndicator;
