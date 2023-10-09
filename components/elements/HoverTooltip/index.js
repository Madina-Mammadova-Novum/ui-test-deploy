'use client';

import { useState } from 'react';

import { TooltipParamsPropTypes } from '@/lib/types';

const HoverTooltip = ({ data, className, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  const { title, description } = data;

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleClose} className="group relative transition-all">
      <span className="text-gray cursor-help">{children}</span>
      {showTooltip && (
        <div
          className={`absolute top-8 ${className} bg-white transition-all min-w-max flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-2.5 rounded-base`}
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
