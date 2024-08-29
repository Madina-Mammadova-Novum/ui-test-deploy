'use client';

import { useState } from 'react';

import { TooltipParamsPropTypes } from '@/lib/types';

const HoverTooltip = ({ data, disabled = false, className, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  const { title, description } = data;

  return (
    <div className="group relative transition-all">
      <span
        onMouseEnter={handleEnter}
        onTouchStart={handleEnter}
        onTouchEnd={handleClose}
        onMouseLeave={handleClose}
        className={`text-gray ${!disabled && 'cursor-help'}`}
      >
        {children}
      </span>
      {!disabled && showTooltip && (
        <div
          className={`absolute top-8 ${className} z-50 flex h-auto w-max flex-col gap-2.5 rounded-base border border-solid border-gray-darker bg-white p-2.5 text-xsm font-semibold text-black transition-all`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleClose}
        >
          {title && <span>{title}</span>}
          {description ?? ''}
        </div>
      )}
    </div>
  );
};

HoverTooltip.propTypes = TooltipParamsPropTypes;

export default HoverTooltip;
