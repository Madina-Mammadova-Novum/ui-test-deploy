import classNames from 'classnames';
import PropTypes from 'prop-types';

import DragSVG from '@/assets/images/drag.svg';
import TableArrowSVG from '@/assets/images/tableArrow.svg';
import { TextWithLabel } from '@/elements';
import { noSSR } from '@/utils/helpers';
import { useMediaQuery } from '@/utils/hooks';

const ExpandableRowHeader = ({ toggle, headerData }) => {
  const sm3 = useMediaQuery('(max-width: 1023px)');
  return (
    <div className="w-full h-auto md:h-[60px] flex items-center gap-x-2.5 py-3 md:py-0">
      <DragSVG className="fill-gray mt-2.5 md:mt-0 self-start md:self-auto" />
      <div className="grid sm:grid-cols-1 3sm:grid-cols-2 md:flex md:flex-row md:items-center w-full gap-x-2.5">
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
          'fill-black transition duration-500 self-start md:self-auto mt-2.5 md:mt-0',
          toggle && 'rotate-180 !fill-blue'
        )}
      />
    </div>
  );
};

ExpandableRowHeader.defaultProps = {
  toggle: false,
  headerData: [],
};

ExpandableRowHeader.propTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default noSSR(ExpandableRowHeader);
