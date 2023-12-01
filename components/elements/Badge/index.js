import { useMemo } from 'react';

import { BadgePropTypes } from '@/lib/types';

import CloseIcon from '@/assets/icons/CloseIcon';

const Badge = ({ counter, onClose, hovered, withCancel = false, name, className = '-top-0.5 right-0' }) => {
  const printAction = useMemo(() => {
    if (counter > 0 && !hovered) {
      return (
        <div
          className={`absolute border p-1 h-5 w-5 border-white border-solid ${className} rounded-full bg-blue text-xxs font-bold text-white flex items-center justify-center`}
        >
          {counter}
        </div>
      );
    }

    if (withCancel && hovered && name) {
      return <CloseIcon onClick={onClose} className="fill-black absolute top-0 right-0 !z-50" />;
    }

    return null;
  }, [onClose, counter, className, hovered, withCancel]);

  return printAction;
};

Badge.propTypes = BadgePropTypes;

export default Badge;
