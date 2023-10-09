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
      <span onMouseEnter={handleEnter} onMouseLeave={handleClose} className={`text-gray ${!disabled && 'cursor-help'}`}>
        {children}
      </span>
      {!disabled && showTooltip && (
        <div
          className={`absolute top-8 ${className} bg-white transition-all w-max flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-2.5 rounded-base`}
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

HoverTooltip.propTypes = TooltipParamsPropTypes.isRequired;

export default HoverTooltip;
