'use client';

import classNames from 'classnames';

import { ExpandableRowHeaderPropTypes } from '@/lib/types';

import TableArrowSVG from '@/assets/images/arrow.svg';
import DragSVG from '@/assets/images/drag.svg';
import { TextWithLabel } from '@/elements';
import { useMediaQuery } from '@/utils/hooks';

const ExpandableRowHeader = ({ toggle = false, headerData = [] }) => {
  const sm3 = useMediaQuery('(max-width: 1023px)');
  return (
    <div className="w-full h-auto lg:h-[60px] flex items-center gap-x-2.5 py-3 lg:py-0">
      <DragSVG className="fill-gray mt-2.5 lg:mt-0 self-start lg:self-auto" />
      <div className="grid md:grid-cols-1 3md:grid-cols-2 lg:flex lg:flex-row lg:items-center w-full gap-x-2.5">
        {headerData.map(({ label, content: { text, image } }, index) => (
          <div
            className={`w-full col-start-1 ${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`}
            style={{ gridRowStart: !sm3 && index > 3 && index - 3 }}
          >
            <TextWithLabel label={label} text={text} coverImage={image} customStyles={!index && 'mr-auto'} />
          </div>
        ))}
      </div>
      <TableArrowSVG
        className={classNames(
          'fill-black transition duration-500 self-start lg:self-auto mt-2.5 lg:mt-0',
          toggle && 'rotate-180 !fill-blue'
        )}
      />
    </div>
  );
};

ExpandableRowHeader.propTypes = ExpandableRowHeaderPropTypes;

export default ExpandableRowHeader;
