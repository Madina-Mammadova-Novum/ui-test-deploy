'use client';

import { useState } from 'react';

import { TooltipParamsPropTypes } from '@/lib/types';

import CloseIcon from '@/assets/images/close.svg';
import { Button } from '@/elements';

const ManualTooltip = ({ title, className, description, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  return (
    <div className="group transition-all">
      <span onMouseEnter={handleEnter} className="text-gray cursor-help font-bold text-xxs">
        {children}
      </span>
      {showTooltip && (
        <div
          className={`absolute top-8 ${className} bg-white transition-all max-w-xs overflow-visible flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-5 rounded-base`}
        >
          <div className="flex justify-between items-center min-w-[280px]">
            {title && <span className="capitalize font-semibold text-xsm">{title}</span>}
            <Button
              buttonProps={{ icon: { before: <CloseIcon /> } }}
              customStyles="!pl-0 !pr-0 hover:bg-gray-darker !py-0"
              onClick={handleClose}
            />
          </div>
          <p className="text-xs-sm font-normal text-left whitespace-pre-wrap normal-case">{description}</p>
        </div>
      )}
    </div>
  );
};

ManualTooltip.propTypes = TooltipParamsPropTypes.isRequired;

export default ManualTooltip;
