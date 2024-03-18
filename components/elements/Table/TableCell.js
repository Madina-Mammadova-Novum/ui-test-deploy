'use client';

import { useEffect, useMemo, useRef } from 'react';

import NextLink from '../NextLink';

import { TableCellPropTypes } from '@/lib/types';

import { Button, HoverTooltip, Placeholder } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import {
  AssignToFleet,
  DeactivateTankerForm,
  DeleteTankerModal,
  DynamicCountdownTimer,
  EditDateForm,
  EditPortForm,
  Flag,
  IconWrapper,
  ModalWindow,
  NegotiatingChartererInformation,
  NegotiatingTankerInformation,
  ReactivateTankerForm,
  RequestDocumentDeletionModal,
  RevokeDocumentDeletionModal,
  UpdateTankerForm,
  ViewCommentContent,
} from '@/units';
import { downloadFile } from '@/utils/helpers';

const TableCell = ({ cellProps }) => {
  const tableRef = useRef(null);

  const {
    id,
    type,
    freezed,
    value,
    date,
    portId,
    helperData,
    name,
    disabled,
    editable,
    countryCode,
    icon,
    actions = [],
    available,
    fleetId,
    fleetName,
    link,
    data,
    downloadData,
    countdownData,
    notified,
    rolled,
  } = cellProps;

  const emptyCell = !value && !editable && !link && !downloadData && !countdownData;

  const port = { value: portId, label: value, countryFlag: countryCode };

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
        return <ViewIncomingOffer itemId={id} cellData={data} />;
      case ACTIONS.VIEW_COUNTEROFFER:
        return <ViewCounteroffer itemId={id} />;
      case ACTIONS.VIEW_CHARTERER_COUNTEROFFER:
        return <ViewIncomingOffer itemId={id} cellData={data} />;
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
      case ACTIONS.REQUEST_DOCUMENT_DELETION:
        return <RequestDocumentDeletionModal documentId={id} />;
      case ACTIONS.REVOKE_DOCUMENT_DELETION:
        return <RevokeDocumentDeletionModal documentId={id} />;
      default:
        return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
    }
  };

  const printValue = useMemo(() => {
    const valueStyles = () => {
      if (disabled) return 'text-gray';
      if (freezed) return 'text-opacity-50 select-none';

      return 'text-inherit';
    };

    return helperData ? (
      <HoverTooltip
        className="!-top-11 !-translate-x-[50%] !w-[300px] !whitespace-pre-wrap"
        data={{ description: helperData }}
      >
        <span className={`${disabled && 'text-gray'}`}>{value}</span>
      </HoverTooltip>
    ) : (
      <span className={valueStyles()}>{value}</span>
    );
  }, [disabled, helperData, freezed, value]);

  const printFlag = useMemo(() => {
    return available && <Flag countryCode={countryCode} className={freezed && 'opacity-50'} />;
  }, [countryCode, available, freezed]);

  const printModalView = useMemo(() => {
    return actions.map((cell) => {
      const { action, actionVariant, actionSize, actionText, editIcon, disabled: actionDisabled, actionStyles } = cell;

      const setStyles = () => {
        if (editable) return `!p-0 ${actionStyles} `;
        if (freezed) return `!select-none cursor-not-allowed !py-1 !px-1.5 ${actionStyles}`;

        return `hover:bg-gray-darker !py-1 !px-1.5 ${actionStyles}`;
      };

      return (
        <ModalWindow
          containerClass="overflow-y-clip"
          buttonProps={{
            icon: { before: editIcon },
            variant: actionVariant,
            size: actionSize,
            text: actionText,
            disabled: actionDisabled || freezed,
            className: setStyles(),
          }}
        >
          {printModal(action)}
        </ModalWindow>
      );
    });
  }, [actions]);

  const cellColor = useMemo(() => {
    if (notified) return 'bg-yellow-light';
    if (disabled) return 'disabled-table';
    if (freezed) return 'freezed-table blur-sm cursor-not-allowed';

    return 'bg-white';
  }, [notified, disabled, freezed]);

  useEffect(() => {
    if (notified && typeof value === 'number') {
      tableRef?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notified, tableRef, value]);

  return (
    <td ref={tableRef} className={`${cellColor} py-2 px-4 whitespace-nowrap table-cell`}>
      <div
        className={`flex ${
          typeof value === 'boolean' || typeof value === 'number' ? 'justify-start' : 'justify-between gap-x-12'
        } normal-case items-center text-xsm`}
      >
        {emptyCell && <Placeholder />}
        {value && (
          <div className="flex gap-x-1 text-inherit items-center px-1">
            {icon && <IconWrapper iconData={{ icon }} />}
            {printFlag}
            {printValue}
            {rolled && available && (
              <span className="bg-yellow uppercase font-bold text-xxs py-1 px-1.5 mx-2 text-black rounded-md">
                Rolled
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
        {countdownData && <DynamicCountdownTimer {...countdownData} />}
        {editable && <div className="flex gap-x-2.5">{printModalView}</div>}
      </div>
    </td>
  );
};

TableCell.propTypes = TableCellPropTypes;

export default TableCell;
