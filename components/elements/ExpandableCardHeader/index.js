import classNames from 'classnames';

import { ExpandableCardHeaderPropTypes } from '@/lib/types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';

const ExpandableCardHeader = ({ toggle = false, headerData = [] }) => {
  const printHeaderRow = (data, index) => (
    <TextWithLabel label={data?.label} text={data?.text} customStyles={!index && 'mr-auto'} />
  );

  return (
    <div className="w-full h-[60px] flex items-center">
      <DragSVG className="fill-gray mr-3.5" />
      <div className="flex items-center w-full gap-x-2.5">
        {headerData.map(printHeaderRow)}
        <div className="hover:bg-gray-darker p-2 rounded-md">
          <TableArrowSVG
            className={classNames('fill-black rounded-md transition duration-200 ', toggle && 'rotate-180 !fill-blue')}
          />
        </div>
      </div>
    </div>
  );
};

ExpandableCardHeader.propTypes = ExpandableCardHeaderPropTypes;

export default ExpandableCardHeader;
