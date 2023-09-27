'use client';

import { memo, useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import NextLink from '../NextLink';

import { TableCellPropTypes } from '@/lib/types';

import { Button, HoverTooltip, Placeholder } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { getGeneralDataSelector } from '@/store/selectors';
import {
  AssignToFleet,
  DeactivateTankerForm,
  DeleteTankerModal,
  EditDateForm,
  EditPortForm,
  IconWrapper,
  ModalWindow,
  NegotiatingChartererInformation,
  NegotiatingTankerInformation,
  ReactivateTankerForm,
  UpdateTankerForm,
  ViewCommentContent,
} from '@/units';
import { downloadFile, getCountryById } from '@/utils/helpers';

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
    fleetName,
    link,
    data,
    downloadData,
  } = cellProps;

  const emptyCell = !value && !editable && !link && !downloadData;

  const country = getCountryById({ data: countries, id: countryId });
  const availableCountryCode = countryFlag || country?.countryCode;

  const port = { value: portId, label: value, countryFlag: availableCountryCode };

  const printModal = (action) => {
    const state = { id, name, date, available, portId, fleetId, type, port };

    switch (action) {
      case ACTIONS.TANKER_DEACTIVATE:
        return (
          <DeactivateTankerForm
            title="Deactivate your Tanker"
            state={{ ...state, action: ACTIONS.TANKER_DEACTIVATE }}
          />
        );
      case ACTIONS.TANKER_REACTIVATE:
        return (
          <ReactivateTankerForm
            title="Reactivate your Tanker"
            state={{ ...state, action: ACTIONS.TANKER_REACTIVATE }}
          />
        );
      case ACTIONS.PORT:
        return <EditPortForm title="edit open port" state={{ ...state, action: ACTIONS.PORT }} />;
      case ACTIONS.DATE:
        return <EditDateForm title="edit open date" state={{ ...state, action: ACTIONS.DATE }} />;
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
      case ACTIONS.VIEW_COMMENTS:
        return <ViewCommentContent data={data} />;
      case ACTIONS.CHARTERER_INFORMATION:
        return <NegotiatingChartererInformation offerId={id} />;
      case ACTIONS.TANKER_INFORMATION:
        return <NegotiatingTankerInformation offerId={id} />;
      case ACTIONS.REQUEST_UPDATE_TANKER_INFO:
        return <UpdateTankerForm fleetData={fleetId && { value: fleetId, label: fleetName }} itemId={id} />;
      case ACTIONS.DELETE_TANKER_FROM_FLEET:
        return <DeleteTankerModal state={{ id, fleetId, name, action }} />;
      case ACTIONS.DELETE_TANKER:
        return <DeleteTankerModal state={{ id, name, action }} />;
      case ACTIONS.ASSIGN_FLEET:
        return <AssignToFleet tankerId={id} name={name} />;
      default:
        return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
    }
  };

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
    return (
      availableCountryCode && <ReactCountryFlag countryCode={availableCountryCode} svg className="!w-5 !h-4 mr-1.5" />
    );
  }, [availableCountryCode]);

  const printModalView = useMemo(() => {
    return actions.map((cell) => {
      const { action, actionVariant, actionSize, actionText, editIcon, disabled: actionDisabled, actionStyles } = cell;

      return (
        <ModalWindow
          containerClass="overflow-y-[unset] z-50"
          buttonProps={{
            icon: { before: editIcon },
            variant: actionVariant,
            size: actionSize,
            text: actionText,
            disabled: actionDisabled,
            className: !editable ? `hover:bg-gray-darker !py-1 !px-1.5 ${actionStyles}` : `!p-0 ${actionStyles}`,
          }}
        >
          {printModal(action)}
        </ModalWindow>
      );
    });
  }, [actions]);

  return (
    <td
      className={`${
        disabled ? 'custom-table' : 'bg-white'
      } py-2 px-4 whitespace-nowrap border border-purple-light border-b-0 first:border-l-0 last:border-r-0`}
    >
      <div
        className={`flex ${
          typeof value === 'boolean' ? 'justify-start' : 'justify-between gap-x-12'
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
        {link && (
          <NextLink href={link} target="blank" className="bg-white p-0 text-blue hover:text-blue-darker">
            View
          </NextLink>
        )}
        {downloadData && (
          <Button
            buttonProps={{ text: 'Download', size: 'medium', variant: 'primary' }}
            customStyles="!px-0"
            onClick={() => downloadFile(downloadData)}
          />
        )}

        <div className="flex gap-x-2.5">{editable && printModalView}</div>
      </div>
    </td>
  );
};

TableCell.propTypes = TableCellPropTypes;

export default memo(TableCell);
