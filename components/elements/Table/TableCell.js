import { useMemo } from 'react';

import { TableCellPropTypes } from '@/lib/types';

import { NextImage, Tooltip } from '@/elements';
import { NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { DeactivateTankerForm, EditDateForm, EditPortForm, ModalWindow } from '@/units';

const TableCell = ({ cellProps }) => {
  const { type, value, marked, helperData, name, disabled, toggle, editable, editIcon, countryFlag } = cellProps;

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
        return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
    }
  }, [name, toggle?.name, type]);

  const printValue = useMemo(() => {
    return helperData ? (
      <Tooltip variant="hover" className="!-top-10 !-left-28 !lg:-left-16" data={{ description: helperData }}>
        <span className={`${disabled && 'text-gray'}`}>{value}</span>
      </Tooltip>
    ) : (
      <span className={`${disabled ? 'text-gray' : 'text-black'}`}>{value}</span>
    );
  }, [disabled, helperData, value]);

  return (
    <td
      name={type}
      className={`${
        disabled ? 'bg-gray-light' : 'bg-white'
      } py-1.5 px-4 whitespace-nowrap border border-purple-light border-b-0 first:border-l-0 last:border-r-0`}
    >
      <div className="flex justify-between items-center text-xsm">
        {value && (
          <div className="flex gap-x-5">
            {countryFlag && (
              <NextImage width={20} height={15} customStyles="h-4" src={countryFlag} alt={`${countryFlag} flag`} />
            )}
            {printValue}
            {marked && (
              <span className="bg-yellow uppercase font-bold text-xxs py-1 px-1.5 mr-2 text-black rounded-md">
                {marked}
              </span>
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

TableCell.propTypes = TableCellPropTypes;

export default TableCell;
