import { useMemo } from 'react';

import PropTypes from 'prop-types';

import EditIcon from '@/assets/images/edit.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import { NextImage } from '@/elements';
import { TYPE } from '@/lib/constants';
import { DeactivateTankerForm, EditDateForm, EditPortForm, ModalWindow } from '@/units';

const TableCell = ({ cellProps }) => {
  const { type, value, name, fontStyle, disabled, toggle, editable, countryFlag } = cellProps;

  const printModal = useMemo(() => {
    switch (type) {
      case TYPE.PORT:
        return <EditPortForm title="edit open port" portName={name} />;
      case TYPE.DATE:
        return <EditDateForm title="edit open date" portName={name} />;
      case TYPE.TANKER_STATUS:
        return (
          <DeactivateTankerForm
            title="Deactivate your Tanker"
            portName={toggle?.name}
            description="By deactivating your tanker you make it temporarily inaccessable for charterers. You will not be able to update its open position while inactive. You can reactivate the tanker and update its open positions any time."
          />
        );
      default:
        return null;
    }
  }, [name, toggle?.name, type]);

  return (
    <td className={`${disabled ? 'bg-gray-light' : 'bg-white'} pl-5`}>
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

        <span className={`${disabled ? 'text-gray' : 'text-black'}`}>{value}</span>
        {editable && (
          <div className="flex justify-end ml-auto">
            <ModalWindow
              buttonProps={{
                icon: <EditIcon />,
                variant: 'tertiary',
                size: 'small',
                className: 'hover:bg-gray-darker !py-1 !px-1.5 mr-5',
              }}
            >
              {printModal}
            </ModalWindow>
          </div>
        )}

        {toggle && (
          <ModalWindow
            buttonProps={{
              icon: !disabled ? <ToggleActiveIcon /> : <ToggleInactiveIcon />,
              variant: 'tertiary',
              size: 'small',
              className: 'relative -left-1/2',
              disabled,
            }}
          >
            {printModal}
          </ModalWindow>
        )}
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
