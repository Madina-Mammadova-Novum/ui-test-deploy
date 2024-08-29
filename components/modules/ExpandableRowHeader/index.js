'use client';

import classNames from 'classnames';

import { ExpandableRowHeaderPropTypes } from '@/lib/types';

import TableArrowSVG from '@/assets/images/arrow.svg';
import { TextWithLabel } from '@/elements';

const ExpandableRowHeader = ({ toggle = false, headerData = [] }) => {
  return (
    <div className="flex h-[60px] w-full items-center">
      <div className="flex w-full items-center gap-x-2.5">
        {headerData.map(({ label, content: { text, image } }, index) => (
          <TextWithLabel label={label} text={text} coverImage={image} customStyles={!index && 'mr-auto'} />
        ))}
        <TableArrowSVG
          className={classNames('fill-black transition duration-500', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableRowHeader.propTypes = ExpandableRowHeaderPropTypes;

export default ExpandableRowHeader;
