import classNames from 'classnames';
import PropTypes from 'prop-types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';

const FleetRowHeader = ({ toggle }) => {
  return (
    <div className="w-full h-[60px] flex items-center">
      <DragSVG className="fill-gray mr-3.5" />
      <TextWithLabel label="fleet name" text="Fleet Base West" />
      <TextWithLabel label="active" text="2 tankers" customStyles="ml-auto" />
      <TextWithLabel label="inactive" text="3 tankers" />
      <TableArrowSVG className={classNames('fill-black transition duration-500', toggle && 'rotate-180 !fill-blue')} />
    </div>
  );
};

FleetRowHeader.defaultProps = {
  toggle: false,
};

FleetRowHeader.propTypes = {
  toggle: PropTypes.bool,
};

export default FleetRowHeader;
