'use client';

import { ToggleRowsPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/doubleArrow.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onToggleClick, value = false }) => {
  return (
    <div aria-hidden type="button" className="flex text-blue text-xsm pr-5 items-center" onClick={onToggleClick}>
      <DoubleArrowSVG className={`transition duration-500 ${value && 'rotate-180'}`} />
      <Button
        buttonProps={{ text: `${value ? 'Collapse' : 'Expand'} all groups`, variant: 'primary', size: 'small' }}
        customStyles="!bg-[transparent] !px-0 !py-0"
      />
    </div>
  );
};

ToggleRows.propTypes = ToggleRowsPropTypes;

export default ToggleRows;
