'use client';

import { useMemo } from 'react';

import { BadgePropTypes } from '@/lib/types';

import CloseIcon from '@/assets/icons/CloseIcon';
import { TypingIndicator } from '@/elements';

const Badge = ({ counter, onClose, hovered, typing, withCancel = false, name, className = '-top-0.5 right-0' }) => {
  const printAction = useMemo(() => {
    if (counter > 0 && !hovered && !typing) {
      return (
        <div
          className={`absolute h-5 w-5 border border-solid border-white p-1 ${className} rounded-full bg-blue ${
            counter > 100 ? 'text-[6px]' : 'text-xxs'
          } flex items-center justify-center font-bold text-white`}
        >
          {counter}
        </div>
      );
    }

    if (counter > 0 && !hovered && !typing) {
      return (
        <div
          className={`absolute h-5 w-5 border border-solid border-white p-1 ${className} rounded-full bg-blue ${
            counter > 100 ? 'text-[6px]' : 'text-xxs'
          } flex items-center justify-center font-bold text-white`}
        >
          {counter}
        </div>
      );
    }

    if (withCancel && hovered && name) {
      return <CloseIcon onClick={onClose} className="absolute right-0 top-0 !z-50 fill-black" />;
    }

    if (withCancel && typing && name) {
      return (
        <TypingIndicator
          size="sm"
          className="absolute right-0 top-0 !z-50 h-2 rounded-base border border-solid border-gray-300 bg-white p-2"
        />
      );
    }

    return null;
  }, [onClose, counter, className, hovered, withCancel]);

  return printAction;
};

Badge.propTypes = BadgePropTypes;

export default Badge;
