import { useMemo } from 'react';

import { BadgePropTypes } from '@/lib/types';

import CloseIcon from '@/assets/icons/CloseIcon';

const Badge = ({ counter, onClose, withCancel = false, hovered, className = 'h-5 w-5 -top-0.5 right-0 p-1' }) => {
  const printAction = useMemo(() => {
    if (counter > 0 && !hovered) {
      return (
        <div
          className={`absolute border border-white border-solid ${className} rounded-full bg-blue text-xxs font-bold text-white flex items-center justify-center`}
        >
          {counter}
        </div>
      );
    }

    if (withCancel && hovered) {
      return <CloseIcon onClick={onClose} className="fill-black absolute top-0 right-0 !z-50" />;
    }

    return null;
  }, [counter, onClose, withCancel, hovered, className]);

  return printAction;
};

Badge.propTypes = BadgePropTypes;

export default Badge;
