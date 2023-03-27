import classNames from 'classnames';
import PropTypes from 'prop-types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';

const ExpandableCardHeader = ({ toggle, headerData }) => {
  const printHeaderRow = (data, index) => (
    <TextWithLabel label={data?.label} text={data?.text} customStyles={!index && 'mr-auto'} />
  );

  return (
    <div className="w-full h-[60px] flex items-center">
      <DragSVG className="fill-gray mr-3.5" />
      <div className="flex items-center w-full gap-x-2.5">
        {headerData.map(printHeaderRow)}
        <TableArrowSVG
          className={classNames('fill-black transition duration-200', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableCardHeader.defaultProps = {
  toggle: false,
  headerData: [],
};

ExpandableCardHeader.propTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ExpandableCardHeader;
