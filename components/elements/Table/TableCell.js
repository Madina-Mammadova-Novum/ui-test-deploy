'use client';

import { useCallback, useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import { TableCellPropTypes } from '@/lib/types';

import { HoverTooltip, Placeholder } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { getGeneralDataSelector } from '@/store/selectors';
import {
  AssignToFleet,
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
import { getCountryById } from '@/utils/helpers';

const TableCell = ({ cellProps }) => {
  const { countries } = useSelector(getGeneralDataSelector);
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
    countryId,
    icon,
    actions = [],
    available,
    fleetId,
  } = cellProps;

  const emptyCell = !value && !editable;

  const printModal = useCallback(
    (action) => {
      switch (action) {
        case ACTIONS.PORT:
          return (
            <EditPortForm title="edit open port" state={{ name, id, date, available, fleetId, action: ACTIONS.PORT }} />
          );
        case ACTIONS.DATE:
          return (
            <EditDateForm
              title="edit open date"
              state={{ name, id, portId, available, fleetId, action: ACTIONS.DATE }}
            />
          );
        case ACTIONS.TANKER_DEACTIVATE:
          return (
            <DeactivateTankerForm
              title="Deactivate your Tanker"
              state={{ name, id, portId, date, available, fleetId, action: ACTIONS.TANKER_DEACTIVATE }}
            />
          );
        case ACTIONS.TANKER_REACTIVATE:
          return (
            <ReactivateTankerForm
              title="Reactivate your Tanker"
              state={{ name, id, fleetId, action: ACTIONS.TANKER_REACTIVATE }}
            />
          );
        case ACTIONS.VIEW_OFFER:
          return <ViewIncomingOffer itemId={id} />;
        case ACTIONS.VIEW_COUNTEROFFER:
          return <ViewCounteroffer itemId={id} />;
        case ACTIONS.VIEW_CHARTERER_COUNTEROFFER:
          return <ViewIncomingOffer itemId={id} />;
        case ACTIONS.VIEW_SENT_OFFER:
          return <ViewCounteroffer itemId={id} />;
        case ACTIONS.VIEW_FAILED_OFFER:
          return <ViewFailedOffer itemId={id} />;
        case ACTIONS.CHARTERER_INFORMATION:
          return <ChartererInformationContent title="Charterer information" />;
        case ACTIONS.TANKER_INFORMATION:
          return <NegotiatingTankerInformation />;
        case ACTIONS.REQUEST_UPDATE_TANKER_INFO:
          return <UpdateTankerForm />;
        case ACTIONS.DELETE_TANKER_FROM_FLEET:
          return <DeleteTankerModal state={{ id, fleetId, name, action }} />;
        case ACTIONS.DELETE_TANKER:
          return <DeleteTankerModal state={{ id, name, action }} />;
        case ACTIONS.ASSIGN_FLEET:
          return <AssignToFleet tankerId={id} name={name} />;
        default:
          return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
      }
    },
    [available, date, fleetId, id, name, portId]
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

  const printCountryFlag = useMemo(() => {
    const country = getCountryById({ data: countries, id: countryId });
    const availableCountryCode = countryFlag || country?.countryCode;

    return (
      availableCountryCode && <ReactCountryFlag countryCode={availableCountryCode} svg className="!w-5 !h-4 mr-1.5" />
    );
  }, [countries, countryFlag, countryId]);

  return (
    <td
      name={type}
      className={`${
        disabled ? 'custom-table' : 'bg-white'
      } py-2 px-4 whitespace-nowrap border border-purple-light border-b-0 first:border-l-0 last:border-r-0`}
    >
      <div
        className={`flex ${
          typeof value === 'boolean' ? 'justify-start' : 'justify-between'
        } normal-case items-center text-xsm`}
      >
        {emptyCell && <Placeholder />}
        {value && (
          <div className="flex gap-x-1 text-inherit items-center">
            {icon && <IconWrapper iconData={{ icon }} />}
            {available && printCountryFlag}
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
                containerClass="overflow-y-[unset] z-50"
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
