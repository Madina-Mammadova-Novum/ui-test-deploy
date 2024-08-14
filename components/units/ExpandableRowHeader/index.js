'use client';

import classNames from 'classnames';

import { ExpandableRowHeaderPropTypes } from '@/lib/types';

import TableArrowSVG from '@/assets/images/arrow.svg';
import { TextWithLabel } from '@/elements';
import { useMediaQuery } from '@/utils/hooks';

const ExpandableRowHeader = ({ toggle = false, headerData = [] }) => {
  const sm3 = useMediaQuery('(max-width: 1023px)');
  return (
    <div className="flex h-auto w-full items-center gap-x-2.5 py-3 lg:h-[60px] lg:py-0">
      <div className="grid w-full gap-x-2.5 gap-y-1 md:grid-cols-1 3md:grid-cols-2 lg:flex lg:flex-row lg:items-center">
        {headerData.map(({ label, content: { text, image } }, index) => (
          <div
            className={`col-start-1 w-full ${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`}
            style={{ gridRowStart: !sm3 && index > 3 && index - 3 }}
          >
            <TextWithLabel label={label} text={text} coverImage={image} customStyles={!index && 'mr-auto'} />
          </div>
        ))}
      </div>
      <TableArrowSVG
        className={classNames(
          'mt-2.5 self-start fill-black transition duration-500 lg:mt-0 lg:self-auto',
          toggle && 'rotate-180 !fill-blue'
        )}
      />
    </div>
  );
};

ExpandableRowHeader.propTypes = ExpandableRowHeaderPropTypes;

export default ExpandableRowHeader;
