import Image from 'next/image';
import PropTypes from 'prop-types';

import Badge from '@/elements/Badge';
import Toggle from '@/elements/Toggle';

const TableCell = ({ countryFlag, text, toggle, badge }) => {
  return (
    <td>
      <div className="flex items-center">
        {countryFlag && <Image width={20} height={15} className="max-h-[15px] mr-1.5" src={countryFlag} />}
        {toggle ? <Toggle /> : text}
        {badge && <Badge>{badge}</Badge>}
      </div>
    </td>
  );
};

TableCell.defaultProps = {
  countryFlag: '',
  text: '',
  badge: '',
  toggle: false,
};

TableCell.propTypes = {
  countryFlag: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  text: PropTypes.string,
  badge: PropTypes.string,
  toggle: PropTypes.bool,
};

export default TableCell;
