'use client';

import { cloneElement, useState } from 'react';

import classnames from 'classnames';

import { TooltipParamsPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { Button } from '@/elements';

const ManualTooltip = ({ data, className, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleEnter = () => setShowTooltip(true);
  const handleClose = () => setShowTooltip(false);

  const { title, description } = data;

  const childrenWithProps = cloneElement(children, {
    className: classnames('fill-black', children.props.className, showTooltip && '!fill-blue'),
  });

  return (
    <div className="group transition-all overflow-visible">
      <span onMouseEnter={handleEnter} className="text-gray cursor-help font-bold text-xxs">
        {childrenWithProps}
      </span>
      {showTooltip && (
        <div
          className={`absolute top-0 ${className} min-w-[240px] bg-white transition-all max-w-xs flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-5 rounded-base`}
        >
          <div className={`flex justify-between items-center ${!title && '!justify-end'}`}>
            {title && <span className="capitalize font-semibold text-xsm">{title}</span>}
            <Button
              buttonProps={{ icon: { before: <CloseSVG /> } }}
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
