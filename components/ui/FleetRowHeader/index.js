import classNames from 'classnames';
import PropTypes from 'prop-types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';
import { noSSR } from '@/utils/helpers';

const FleetRowHeader = ({ toggle, headerData }) => {
  return (
    <div className="w-full h-[60px] flex items-center">
      <DragSVG className="fill-gray mr-3.5" />
      <div className="flex items-center w-full gap-x-2.5">
        {headerData.map(({ label, content: { text, image } }, index) => (
          <TextWithLabel label={label} text={text} image={image} customStyles={!index && 'mr-auto'} />
        ))}
        <TableArrowSVG
          className={classNames('fill-black transition duration-500', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

FleetRowHeader.defaultProps = {
  toggle: false,
  headerData: [],
};

FleetRowHeader.propTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default noSSR(FleetRowHeader);
