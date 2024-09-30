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
    isValid = false,
    flagOfRegistry,
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
        return (
          <UpdateTankerForm fleetData={fleetId && { value: fleetId, label: fleetName }} itemId={id} isValid={isValid} />
        );
      case ACTIONS.DELETE_TANKER_FROM_FLEET:
        return <DeleteTankerModal state={{ id, fleetId, name, action, fleetName }} />;
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
        className="!-top-11 !w-[300px] !-translate-x-[50%] !whitespace-pre-wrap"
        data={{ description: helperData }}
      >
        <span className={`${disabled && 'text-gray'}`}>{value}</span>
      </HoverTooltip>
    ) : (
      <span className={valueStyles()}>{value}</span>
    );
  }, [disabled, helperData, freezed, value]);

  const printFlag = useMemo(() => {
    return available && <Flag countryCode={countryCode || flagOfRegistry} className={freezed && 'opacity-50'} />;
  }, [countryCode, available, freezed]);

  const getContainerClass = (action) => {
    const modalActions = [
      ACTIONS.TANKER_INFORMATION,
      ACTIONS.CHARTERER_INFORMATION,
      ACTIONS.ASSIGN_FLEET,
      ACTIONS.PORT,
      ACTIONS.DATE,
      ACTIONS.TANKER_REACTIVATE,
      ACTIONS.TANKER_DEACTIVATE,
      ACTIONS.REQUEST_UPDATE_TANKER_INFO,
      ACTIONS.DELETE_TANKER,
    ];

    return modalActions.includes(action) ? 'overflow-y-hidden' : 'h-full overflow-y-hidden';
  };

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
          containerClass={getContainerClass(action)}
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
    if (freezed) return `${notified ? 'bg-yellow-light' : 'freezed-table'} blur-sm cursor-not-allowed`;
    if (notified) return 'bg-yellow-light';
    if (disabled) return 'disabled-table';

    return 'bg-white';
  }, [notified, disabled, freezed]);

  useEffect(() => {
    if (notified && typeof value === 'number') {
      tableRef?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notified, tableRef, value]);

  return (
    <td ref={tableRef} className={`${cellColor} table-cell whitespace-nowrap px-4 py-2`}>
      <div
        className={`flex ${
          typeof value === 'boolean' || typeof value === 'number' ? 'justify-start' : 'justify-between gap-x-12'
        } items-center text-xsm normal-case`}
      >
        {emptyCell && <Placeholder />}
        {value && (
          <div className="flex items-center gap-x-1 px-1 text-inherit">
            {icon && <IconWrapper iconData={{ icon }} />}
            {printFlag}
            {printValue}
            {rolled && available && (
              <span className="mx-2 rounded-md bg-yellow px-1.5 py-1 text-xxs font-bold uppercase text-black">
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
