import ClockIcon from '@/assets/images/clock.svg';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const ownerNegotiatingHeaderDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { tankerName, imo, fleetName, openDate, openPort } = data;

  return [
    {
      label: 'tanker name',
      text: tankerName ?? '',
    },
    {
      label: 'imo',
      text: imo ?? '',
    },
    {
      label: 'fleet name',
      text: fleetName ?? '',
    },
    {
      label: 'open date',
      text: openDate ?? '',
    },
    {
      label: 'open port',
      text: openPort ?? '',
    },
  ];
};

export const chartererNegotiatingHeaderDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { cargoId, imo, quantity, loadPort, laycanStart, laycanEnd, creationDate } = data;

  return [
    {
      label: 'Cargo id',
      text: cargoId ?? '',
    },
    {
      label: 'Cargo type',
      text: imo ?? '',
    },
    {
      label: 'Quantity',
      text: quantity ?? '',
    },
    {
      label: 'Load port',
      text: loadPort ?? '',
    },
    {
      label: 'Laycan start',
      text: laycanStart ?? '',
    },
    {
      label: 'Laycan end',
      text: laycanEnd ?? '',
    },
    {
      label: 'Creation date',
      text: creationDate ?? '',
    },
  ];
};

export const incomingTabRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => incomingTabRowDataAdapter({ data: rowData }));
};

export const incomingTabRowDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { incomingOfferCargoId, laycanStart, laycanEnd, loadPort, status, dateReceived, countdown, id } = data;

  return {
    id,
    incomingOfferCargoId: {
      value: incomingOfferCargoId ?? NO_DATA_MESSAGE.IMO,
    },
    laycanStart: {
      value: laycanStart ?? NO_DATA_MESSAGE.PORT,
    },
    laycanEnd: {
      value: laycanEnd ?? NO_DATA_MESSAGE.DEFAULT,
    },
    loadPort: {
      value: loadPort ?? false,
    },
    status: {
      value: status ?? false,
    },
    dateReceived: {
      value: dateReceived ? transformDate(dateReceived, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    countdown: {
      value: countdown || '-',
    },
  };
};

export const incomingTabCellAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const {
    incomingOfferCargoId = {},
    laycanStart = {},
    laycanEnd = {},
    loadPort = {},
    status = {},
    dateReceived = {},
    countdown = {},
    id,
  } = data;

  if (!incomingOfferCargoId.value) return [];

  return [
    {
      value: index,
    },
    {
      id,
      value: incomingOfferCargoId.value,
      type: TYPE.SEMIBOLD_BLUE,
    },
    {
      id,
      value: laycanStart.value,
    },
    {
      id,
      value: laycanEnd.value,
    },
    {
      id,
      value: loadPort.value,
    },
    {
      id,
      value: status.value,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      value: dateReceived.value,
    },
    {
      id,
      value: countdown.value,
      type: TYPE.RED,
      icon: <ClockIcon className="fill-red" />,
    },
    {
      id,
      action: ACTIONS.VIEW_OFFER,
      actionText: 'View offer',
      actionVariant: 'primary',
      actionSize: 'medium',
      editable: true,
    },
  ];
};

/// ///////////////////////////////////

export const sentCounteroffersTabRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => sentCounteroffersTabRowDataAdapter({ data: rowData }));
};

export const sentCounteroffersTabRowDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { sentOfferCargoId, laycanStart, laycanEnd, loadPort, dateSent, countdown, id } = data;

  return {
    id,
    sentOfferCargoId: {
      value: sentOfferCargoId ?? NO_DATA_MESSAGE.IMO,
    },
    laycanStart: {
      value: laycanStart ?? NO_DATA_MESSAGE.PORT,
    },
    laycanEnd: {
      value: laycanEnd ?? NO_DATA_MESSAGE.DEFAULT,
    },
    loadPort: {
      value: loadPort ?? false,
    },
    dateSent: {
      value: dateSent ? transformDate(dateSent, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    countdown: {
      value: countdown || '-',
    },
  };
};

export const sentCounterofferTabCellAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const {
    sentOfferCargoId = {},
    laycanStart = {},
    laycanEnd = {},
    loadPort = {},
    dateSent = {},
    countdown = {},
    id,
  } = data;

  if (!sentOfferCargoId.value) return [];

  return [
    {
      value: index,
    },
    {
      id,
      value: sentOfferCargoId.value,
      type: TYPE.SEMIBOLD_BLUE,
    },
    {
      id,
      value: laycanStart.value,
    },
    {
      id,
      value: laycanEnd.value,
    },
    {
      id,
      value: loadPort.value,
    },
    {
      id,
      value: dateSent.value,
    },
    {
      id,
      value: countdown.value,
      type: TYPE.RED,
      icon: <ClockIcon className="fill-red" />,
    },
    {
      id,
      action: ACTIONS.VIEW_COUNTEROFFER,
      actionText: 'View counteroffer',
      actionVariant: 'primary',
      actionSize: 'medium',
      editable: true,
    },
  ];
};

/// ///////////////////////////////////

export const failedTabRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => failedTabRowDataAdapter({ data: rowData }));
};

export const failedTabRowDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { failedOfferCargoId, laycanStart, laycanEnd, loadPort, dateFailed, reason, id } = data;

  return {
    id,
    failedOfferCargoId: {
      value: failedOfferCargoId ?? NO_DATA_MESSAGE.IMO,
    },
    laycanStart: {
      value: laycanStart ?? NO_DATA_MESSAGE.PORT,
    },
    laycanEnd: {
      value: laycanEnd ?? NO_DATA_MESSAGE.DEFAULT,
    },
    loadPort: {
      value: loadPort ?? false,
    },
    dateFailed: {
      value: dateFailed ? transformDate(dateFailed, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    reason: {
      value: reason || '-',
    },
  };
};

export const failedTabCellAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const {
    failedOfferCargoId = {},
    laycanStart = {},
    laycanEnd = {},
    loadPort = {},
    dateFailed = {},
    reason = {},
    id,
  } = data;

  if (!failedOfferCargoId.value) return [];

  return [
    {
      value: index,
    },
    {
      id,
      value: failedOfferCargoId.value,
      type: TYPE.SEMIBOLD_BLUE,
    },
    {
      id,
      value: laycanStart.value,
    },
    {
      id,
      value: laycanEnd.value,
    },
    {
      id,
      value: loadPort.value,
    },
    {
      id,
      value: dateFailed.value,
    },
    {
      id,
      value: reason.value,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      action: ACTIONS.VIEW_FAILED_OFFER,
      actionText: 'View failed offer',
      actionVariant: 'primary',
      actionSize: 'medium',
      editable: true,
    },
  ];
};
