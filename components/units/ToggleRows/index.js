'use client';

import classNames from 'classnames';

import { ToggleRowsPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/angleDouble.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onToggleClick }) => {
  return (
    <div className="flex text-xsm">
      <Button
        buttonProps={{
          text: `Expand all groups`,
          variant: 'primary',
          size: 'small',
          icon: {
            before: (
              <DoubleArrowSVG
                className={classNames('fill-blue transition duration-500 group-hover:fill-blue-darker')}
              />
            ),
          },
        }}
        customStyles="!px-0 !py-0 !bg-[transparent] !text-xsm"
        onClick={() => onToggleClick({ value: true })}
      />
      <Button
        buttonProps={{
          text: `Collapse all groups`,
          variant: 'primary',
          size: 'small',
          icon: {
            before: (
              <DoubleArrowSVG
                className={classNames('rotate-180 fill-blue transition duration-500 group-hover:fill-blue-darker')}
              />
            ),
          },
        }}
        customStyles="!px-0 !py-0 !bg-[transparent] !rounded-none border-l border-gray-darker !text-xsm"
        onClick={() => onToggleClick({ value: false })}
      />
    </div>
  );
};

ToggleRows.propTypes = ToggleRowsPropTypes;

export default ToggleRows;
