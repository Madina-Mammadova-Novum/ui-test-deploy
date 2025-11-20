'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { ToggleRowsPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/angleDouble.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onToggleClick, expandAll = null }) => {
  const [isExpanded, setIsExpanded] = useState(expandAll === true);

  useEffect(() => {
    setIsExpanded(expandAll === true);
  }, [expandAll]);

  const handleToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onToggleClick({ value: newExpandedState });
  };

  const buttonText = isExpanded ? 'Collapse all groups' : 'Expand all groups';
  const iconClasses = classNames('fill-blue transition duration-500 group-hover:fill-blue-darker', {
    'rotate-180': isExpanded,
  });

  return (
    <div className="flex text-xsm">
      <Button
        buttonProps={{
          text: buttonText,
          variant: 'primary',
          size: 'small',
          icon: {
            before: <DoubleArrowSVG className={iconClasses} />,
          },
        }}
        customStyles="!px-0 !py-0 !bg-[transparent] !text-xsm"
        onClick={handleToggle}
      />
    </div>
  );
};

ToggleRows.propTypes = ToggleRowsPropTypes;

export default ToggleRows;
