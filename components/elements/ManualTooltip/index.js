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
    <div className="group overflow-visible transition-all">
      <span onMouseEnter={handleEnter} className="cursor-help text-xxs font-bold text-gray">
        {childrenWithProps}
      </span>
      {showTooltip && (
        <div
          className={`absolute top-0 ${className} z-50 flex h-auto min-w-[240px] max-w-xs flex-col gap-2.5 rounded-base border border-solid border-gray-darker bg-white p-5 text-xsm font-semibold text-black transition-all`}
        >
          <div className={`flex items-center justify-between ${!title && '!justify-end'}`}>
            {title && <span className="text-xsm font-semibold capitalize">{title}</span>}
            <Button
              buttonProps={{ icon: { before: <CloseSVG /> } }}
              customStyles="!pl-0 !pr-0 hover:bg-gray-darker !py-0"
              onClick={handleClose}
            />
          </div>
          <p className="whitespace-pre-wrap text-left text-xs-sm font-normal normal-case">{description}</p>
        </div>
      )}
    </div>
  );
};

ManualTooltip.propTypes = TooltipParamsPropTypes.isRequired;

export default ManualTooltip;
