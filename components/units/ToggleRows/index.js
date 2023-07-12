'use client';

import classnames from 'classnames';

import { ToggleRowsPropTypes } from '@/lib/types';

import DoubleArrowSVG from '@/assets/images/angleDouble.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onToggleClick }) => {
  return (
    <div className="flex">
      <Button
        buttonProps={{
          text: `Expand all groups`,
          variant: 'primary',
          size: 'small',
          icon: {
            before: (
              <DoubleArrowSVG
                className={classnames('fill-blue group-hover:fill-blue-darker transition duration-500 rotate-180')}
              />
            ),
          },
        }}
        customStyles="!px-0 !py-0 !bg-[transparent]"
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
                className={classnames('fill-blue group-hover:fill-blue-darker transition duration-500')}
              />
            ),
          },
        }}
        customStyles="!px-0 !py-0 !bg-[transparent] !rounded-none border-l border-gray-darker"
        onClick={() => onToggleClick({ value: false })}
      />
    </div>
  );
};

ToggleRows.propTypes = ToggleRowsPropTypes;

export default ToggleRows;
