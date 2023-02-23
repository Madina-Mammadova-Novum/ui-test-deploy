import PropTypes from 'prop-types';

import { NextImage, Badge, Toggle } from '@/elements';
import { makeId } from '@/utils/helpers';

const TableCell = ({ countryFlag, text, toggle, badge }) => {
  return (
    <td>
      <div className="flex items-center">
        {countryFlag && <NextImage width={20} height={15} customStyles="max-h-[15px] mr-1.5" src={countryFlag} alt={`${countryFlag} flag`}/>}
        {toggle ? <Toggle id={makeId()} /> : text}
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
