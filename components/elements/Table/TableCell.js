import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { NextImage } from '@/elements';
import { TYPE } from '@/lib/constants';
import { DeactivateTankerForm, EditDateForm, EditPortForm, ModalWindow } from '@/units';

const TableCell = ({ cellProps }) => {
  const { type, value, marked, name, disabled, toggle, editable, editIcon, countryFlag } = cellProps;

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
    <td
      name={type}
      className={`${
        disabled ? 'bg-gray-light' : 'bg-white'
      } py-1.5 px-4 whitespace-nowrap w-min border-l-0 border-r border-b overflow-hidden border-t-0 border-purple-light`}
    >
      <div className="flex w-full justify-between items-center text-xsm font-normal">
        {value && (
          <div className="flex gap-x-5">
            {countryFlag && (
              <NextImage width={20} height={15} customStyles="h-4" src={countryFlag} alt={`${countryFlag} flag`} />
            )}
            <span className={`${disabled ? 'text-gray' : 'text-black'}`}>{value}</span>
            {marked && (
              <span className="bg-yellow uppercase font-bold text-xxs py-1 px-1.5 text-black rounded-md">{marked}</span>
            )}
          </div>
        )}

        {editable && (
          <ModalWindow
            buttonProps={{
              icon: { before: editIcon },
              variant: 'tertiary',
              size: 'small',
              className: !toggle ? 'hover:bg-gray-darker !py-1 !px-1.5' : '!p-0 mt-1.5',
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
    editIcon: PropTypes.node,
    badge: PropTypes.string,
    toggle: PropTypes.bool,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    marked: PropTypes.string,
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default TableCell;
