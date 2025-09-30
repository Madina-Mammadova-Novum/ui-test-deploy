'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

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
  UpdateVesselCategoryTwo,
  ViewCommentContent,
} from '@/units';
import { downloadFile, handleFileView } from '@/utils/helpers';

const TableCell = ({ cellProps }) => {
  const tableRef = useRef(null);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    isValid = true,
    flagOfRegistry,
    vesselId,
    vesselCategoryOneId,
    vesselTypeId,
    vesselCategoryTwoOptions,
    rowType,
  } = cellProps;

  const emptyCell = !value && !link && !downloadData && !countdownData && (!editable || rowType === 'category-two');

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
          <ReactivateTankerForm title="Activate your Tanker" state={{ ...state, action: ACTIONS.TANKER_REACTIVATE }} />
        );
      case ACTIONS.PORT:
        return <EditPortForm title="edit open port" state={{ ...state, action: ACTIONS.PORT }} />;
      case ACTIONS.DATE:
        return <EditDateForm title="edit open date" state={{ ...state, action: ACTIONS.DATE }} />;
      case ACTIONS.VIEW_OFFER:
        return <ViewIncomingOffer itemId={id} cellData={data} minimizeModal={setIsMinimized} />;
      case ACTIONS.VIEW_COUNTEROFFER:
        return <ViewCounteroffer itemId={id} />;
      case ACTIONS.VIEW_CHARTERER_COUNTEROFFER:
        return <ViewIncomingOffer itemId={id} cellData={data} minimizeModal={setIsMinimized} />;
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
      case ACTIONS.DELETE_TANKER:
        return <DeleteTankerModal state={{ id, name, action, fleetId }} />;
      case ACTIONS.ASSIGN_FLEET:
        return <AssignToFleet tankerId={id} name={name} currentFleetId={fleetId} />;
      case ACTIONS.UPDATE_VESSEL_CATEGORY_TWO:
        return (
          <UpdateVesselCategoryTwo
            vesselId={vesselId}
            tankerName={name}
            vesselCategoryOneId={vesselCategoryOneId}
            vesselTypeId={vesselTypeId}
            vesselCategoryTwoOptions={vesselCategoryTwoOptions}
            currentValue={value ? { id: value.id, name: value } : null}
          />
        );
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
      if (flagOfRegistry || icon) return 'font-bold';
      return 'text-inherit';
    };

    return helperData ? (
      <HoverTooltip
        className="!-top-11 !w-[300px] !-translate-x-[50%] !whitespace-pre-wrap"
        data={{ description: helperData }}
      >
        <p className={`${disabled && 'text-gray'}`}>{value}</p>
      </HoverTooltip>
    ) : (
      <p className={valueStyles()}>{value}</p>
    );
  }, [disabled, helperData, freezed, value]);

  const printFlag = useMemo(() => {
    return (
      available && <Flag countryCode={countryCode || flagOfRegistry} className={classNames(freezed && 'opacity-50')} />
    );
  }, [countryCode, available, freezed, flagOfRegistry]);

  const getContainerClass = (action) => {
    const modalActions = [
      ACTIONS.TANKER_INFORMATION,
      ACTIONS.CHARTERER_INFORMATION,
      ACTIONS.ASSIGN_FLEET,
      ACTIONS.UPDATE_VESSEL_CATEGORY_TWO,
      ACTIONS.PORT,
      ACTIONS.DATE,
      ACTIONS.TANKER_REACTIVATE,
      ACTIONS.TANKER_DEACTIVATE,
      ACTIONS.REQUEST_UPDATE_TANKER_INFO,
      ACTIONS.DELETE_TANKER,
      ACTIONS.VIEW_COMMENTS,
      ACTIONS.REQUEST_DOCUMENT_DELETION,
      ACTIONS.REVOKE_DOCUMENT_DELETION,
      isMinimized && ACTIONS.VIEW_CHARTERER_COUNTEROFFER,
      isMinimized && ACTIONS.VIEW_OFFER,
    ];

    return modalActions.includes(action) ? 'overflow-y-auto' : 'h-full overflow-y-auto';
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
          key={action}
          containerClass={getContainerClass(action)}
          buttonProps={{
            icon: { before: editIcon },
            variant: actionVariant,
            size: actionSize,
            text: actionText,
            disabled: actionDisabled || Boolean(freezed),
            className: setStyles(),
          }}
        >
          {printModal(action)}
        </ModalWindow>
      );
    });
  }, [actions, isMinimized]);

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

  const handleFileViewWithLoading = async (url) => {
    try {
      setIsLoading(true);
      await handleFileView(url);
    } finally {
      setIsLoading(false);
    }
  };

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
              <p className="mx-2 rounded-md bg-yellow px-1.5 py-1 text-xxs font-bold uppercase text-black">Rolled</p>
            )}
          </div>
        )}
        {link && (
          <Button
            buttonProps={{
              text: isLoading ? 'Loading...' : 'View',
              size: 'small',
              variant: 'primary',
              disabled: isLoading,
            }}
            onClick={() => handleFileViewWithLoading(link)}
            customStyles="bg-white !p-0 text-blue hover:text-blue-darker disabled:opacity-50"
          />
        )}
        {downloadData && (
          <Button
            buttonProps={{ text: 'Download', size: 'medium', variant: 'primary' }}
            customStyles="!px-0"
            onClick={() => downloadFile(downloadData)}
          />
        )}
        {countdownData && <DynamicCountdownTimer {...countdownData} />}
        {editable && <div className="flex w-full justify-end gap-x-2.5">{printModalView}</div>}
      </div>
    </td>
  );
};

TableCell.propTypes = TableCellPropTypes;

export default TableCell;
