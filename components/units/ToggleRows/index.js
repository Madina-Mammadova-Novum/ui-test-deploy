'use client';

import { ToggleRowsPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/doubleArrow.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onToggleClick, value = false }) => {
  return (
    <Button
      buttonProps={{
        text: `${value ? 'Collapse' : 'Expand'} all groups`,
        variant: 'primary',
        size: 'small',
        icon: {
          before: (
            <DoubleArrowSVG
              className={`fill-blue group-hover:fill-blue-darker transition duration-500 ${value && 'rotate-180'}`}
            />
          ),
        },
      }}
      customStyles="!px-0 !py-0 !bg-[transparent]"
      onClick={onToggleClick}
    />
  );
};

ToggleRows.propTypes = ToggleRowsPropTypes;

export default ToggleRows;
