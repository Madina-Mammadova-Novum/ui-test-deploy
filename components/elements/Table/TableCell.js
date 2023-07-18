import { useCallback, useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { TableCellPropTypes } from '@/lib/types';

import { HoverTooltip, Placeholder } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import {
  ChartererInformationContent,
  DeactivateTankerForm,
  DeleteTankerModal,
  EditDateForm,
  EditPortForm,
  IconWrapper,
  ModalWindow,
  NegotiatingTankerInformation,
  ReactivateTankerForm,
  UpdateTankerForm,
} from '@/units';

const TableCell = ({ cellProps }) => {
  const {
    id,
    type,
    value,
    marked,
    date,
    portId,
    helperData,
    name,
    disabled,
    editable,
    countryFlag,
    icon,
    actions = [],
  } = cellProps;
  const emptyCell = !value && !editable;

  const printModal = useCallback(
    (action) => {
      switch (action) {
        case ACTIONS.PORT:
          return <EditPortForm title="edit open port" modalState={{ name, id, date }} />;
        case ACTIONS.DATE:
          return <EditDateForm title="edit open date" modalState={{ name, id, portId }} />;
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
          return <ViewIncomingOffer itemId={id} />;
        case ACTIONS.VIEW_COUNTEROFFER:
          return <ViewCounteroffer />;
        case ACTIONS.VIEW_CHARTERER_COUNTEROFFER:
          return <ViewIncomingOffer />;
        case ACTIONS.VIEW_SENT_OFFER:
          return <ViewCounteroffer />;
        case ACTIONS.VIEW_FAILED_OFFER:
          return <ViewFailedOffer />;
        case ACTIONS.CHARTERER_INFORMATION:
          return <ChartererInformationContent title="Charterer information" />;
        case ACTIONS.TANKER_INFORMATION:
          return <NegotiatingTankerInformation />;
        case ACTIONS.REQUEST_UPDATE_TANKER_INFO:
          return <UpdateTankerForm />;
        case ACTIONS.DELETE_TANKER:
          return <DeleteTankerModal />;
        default:
          return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
      }
    },
    [name]
  );

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
        disabled ? 'custom-table' : 'bg-white'
      } py-1.5 px-4 whitespace-nowrap border border-purple-light border-b-0 first:border-l-0 last:border-r-0`}
    >
      <div className={`flex ${typeof value === 'boolean' ? 'justify-start' : 'justify-between'} items-center text-xsm`}>
        {emptyCell && <Placeholder />}
        {value && (
          <div className="flex gap-x-1 text-inherit items-center">
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

        <div className="flex gap-x-2.5">
          {editable &&
            actions.map(({ action, actionVariant, actionSize, actionText, editIcon }) => (
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
                {printModal(action)}
              </ModalWindow>
            ))}
        </div>
      </div>
    </td>
  );
};

TableCell.propTypes = TableCellPropTypes;

export default TableCell;
