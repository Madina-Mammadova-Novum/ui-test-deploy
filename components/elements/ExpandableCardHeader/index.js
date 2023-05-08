import classNames from 'classnames';

import { ExpandableCardHeaderPropTypes } from '@/lib/types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';
import { useMediaQuery } from '@/utils/hooks';

const ExpandableCardHeader = ({ toggle = false, headerData = [] }) => {
  const sm3 = useMediaQuery('(max-width: 1023px)');

  const printHeaderRow = (data, index) => (
    <div
      className={`w-full col-start-1 ${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`}
      style={{ gridRowStart: !sm3 && index > 3 && index - 3 }}
    >
      <TextWithLabel label={data?.label} text={data?.text} customStyles={!index && 'mr-auto'} />
    </div>
  );

  return (
    <div className="w-full h-auto lg:h-[60px] flex items-center gap-x-2.5 py-3 lg:py-0">
      <DragSVG className="fill-gray mt-2.5 lg:mt-0 self-start lg:self-auto" />
      <div className="grid md:grid-cols-1 3md:grid-cols-2 lg:flex lg:flex-row lg:items-center w-full gap-x-2.5">
        {headerData.map(printHeaderRow)}
      </div>
      <div className="hover:bg-gray-darker p-2 rounded-md self-start lg:self-auto">
        <TableArrowSVG
          className={classNames('fill-black rounded-md transition duration-200 ', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableCardHeader.propTypes = ExpandableCardHeaderPropTypes;

export default ExpandableCardHeader;
