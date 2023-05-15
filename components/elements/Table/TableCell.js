import { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { TableCellPropTypes } from '@/lib/types';

import { HoverTooltip } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import {
  ChartererInformationContent,
  DeactivateTankerForm,
  EditDateForm,
  EditPortForm,
  IconWrapper,
  ModalWindow,
  ReactivateTankerForm,
} from '@/units';

const TableCell = ({ cellProps }) => {
  const {
    type,
    value,
    marked,
    helperData,
    name,
    disabled,
    editable,
    editIcon,
    countryFlag,
    icon,
    action,
    actionText,
    actionVariant = 'tertiary',
    actionSize = 'medium',
  } = cellProps;

  const printModal = useMemo(() => {
    switch (action) {
      case ACTIONS.PORT:
        return <EditPortForm title="edit open port" portName={name} />;
      case ACTIONS.DATE:
        return <EditDateForm title="edit open date" portName={name} />;
      case ACTIONS.TANKER_DEACTIVATE:
        return (
          <DeactivateTankerForm
            title="Deactivate your Tanker"
            portName={name}
            description="By deactivating your tanker you make it temporarily inaccessable for charterers. You will not be able to update its open position while inactive. You can reactivate the tanker and update its open positions any time."
          />
        );
      case ACTIONS.TANKER_REACTIVATE:
        return <ReactivateTankerForm title="Reactivate your Tanker" portName={name} />;
      case ACTIONS.VIEW_OFFER:
        return <ViewIncomingOffer />;
      case ACTIONS.VIEW_COUNTEROFFER:
        return <ViewCounteroffer />;
      case ACTIONS.VIEW_FAILED_OFFER:
        return <ViewFailedOffer />;
      case ACTIONS.CHARTERER_INFORMATION:
        return <ChartererInformationContent title="Charterer information" />;
      default:
        return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
    }
  }, [name, action]);

  const printValue = useMemo(() => {
    return helperData ? (
      <HoverTooltip className="!-top-10 !-left-28 !lg:-left-16" data={{ description: helperData }}>
        <span className={`${disabled && 'text-gray'}`}>{value}</span>
      </HoverTooltip>
    ) : (
      <span className={`${disabled ? 'text-gray' : 'text-inherit'}`}>{value}</span>
    );
  }, [disabled, helperData, value]);

  return (
    <td
      name={type}
      className={`${
        disabled ? 'bg-gray-light' : 'bg-white'
      } py-1.5 px-4 whitespace-nowrap border border-purple-light border-b-0 first:border-l-0 last:border-r-0`}
    >
      <div className={`flex ${typeof value === 'boolean' ? 'justify-start' : 'justify-between'} items-center text-xsm`}>
        {value && (
          <div className="flex gap-x-1 text-inherit">
            {icon && <IconWrapper iconData={{ icon }} />}
            {countryFlag && <ReactCountryFlag countryCode={countryFlag} svg className="!w-5 !h-4 mr-1.5" />}
            {printValue}
            {marked && (
              <span className="bg-yellow uppercase font-bold text-xxs py-1 px-1.5 mx-2 text-black rounded-md">
                {marked}
              </span>
            )}
          </div>
        )}

        {editable && (
          <ModalWindow
            containerClass="overflow-y-[unset]"
            buttonProps={{
              icon: { before: editIcon },
              variant: actionVariant,
              size: actionSize,
              text: actionText,
              className: !editable ? 'hover:bg-gray-darker !py-1 !px-1.5' : '!p-0',
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
