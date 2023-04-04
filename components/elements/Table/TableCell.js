import classnames from 'classnames';
import PropTypes from 'prop-types';

import EditIcon from '@/assets/images/edit.svg';
import { NextImage, Toggle } from '@/elements';
import { ModalWindow } from '@/units';

/* Draft Version */

const TableCell = ({ cellProps }) => {
  const { text, name, fontStyle, disabled, toggle, editable, countryFlag, id } = cellProps;

  return (
    <td className={`${disabled ? 'bg-gray-light' : 'bg-white'}`}>
      <div
        className={classnames(
          'flex items-center font-normal text-black text-xsm',
          fontStyle?.color && `text-${fontStyle?.color}`,
          {
            '!font-semibold': fontStyle?.semibold,
          }
        )}
      >
        {countryFlag && (
          <NextImage
            width={20}
            height={15}
            customStyles="max-h-[15px] mr-1.5"
            src={countryFlag}
            alt={`${countryFlag} flag`}
          />
        )}

        <div className="flex items-center gap-x-2.5">
          <span className={`${disabled ? 'text-gray' : 'text-black'}`}>{text}</span>
          {editable && (
            <ModalWindow
              buttonProps={{
                icon: <EditIcon />,
                variant: 'tertiary',
                size: 'small',
                className: 'hover:bg-gray-darker !py-1 !px-2',
              }}
            >
              {name}
            </ModalWindow>
          )}
        </div>

        {toggle && <Toggle id={id} value={toggle.value} disabled={disabled} />}
      </div>
    </td>
  );
};

TableCell.propTypes = {
  cellProps: PropTypes.shape({
    countryFlag: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    text: PropTypes.string,
    name: PropTypes.string,
    fontStyle: PropTypes.shape({
      semibold: PropTypes.bool,
      color: PropTypes.string,
    }),
    badge: PropTypes.string,
    toggle: PropTypes.bool,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default TableCell;
