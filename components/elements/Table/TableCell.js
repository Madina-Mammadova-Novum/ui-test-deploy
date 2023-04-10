import { useMemo } from 'react';

import PropTypes from 'prop-types';

import EditIcon from '@/assets/images/edit.svg';
import { NextImage, Toggle } from '@/elements';
import { TYPE } from '@/lib/constants';
import { EditDateForm, EditPortForm, ModalWindow } from '@/units';

const TableCell = ({ cellProps }) => {
  const { type, value, name, fontStyle, disabled, toggle, editable, countryFlag, id } = cellProps;

  const printModal = useMemo(() => {
    switch (type) {
      case TYPE.PORT:
        return <EditPortForm title="edit open port" portName={name} />;
      case TYPE.DATE:
        return <EditDateForm title="edit open date" portName={name} />;
      default:
        return null;
    }
  }, [name, type]);

  return (
    <td className={`${disabled ? 'bg-gray-light' : 'bg-white'}`}>
      <div
        className={`flex items-center text-xsm text-${fontStyle?.color ?? 'black'} 
        ${fontStyle?.semibold ? 'font-semibold' : 'font-normal'} `}
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

        <div className="flex w-full items-center text-center">
          <span className={`${disabled ? 'text-gray' : 'text-black'}`}>{value}</span>
          {editable && (
            <ModalWindow
              buttonProps={{
                icon: { before: <EditIcon /> },
                variant: 'tertiary',
                size: 'small',
                className: 'hover:bg-gray-darker !py-1 !pr-0 !pl-1.5 !ml-auto mr-1.5',
              }}
            >
              {printModal}
            </ModalWindow>
          )}
        </div>

        {toggle && <Toggle id={id} value={toggle.value} className="-left-[80%]" disabled={disabled} />}
      </div>
    </td>
  );
};

TableCell.propTypes = {
  cellProps: PropTypes.shape({
    countryFlag: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    type: PropTypes.string,
    value: PropTypes.string,
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
