import ClockSVG from '@/assets/images/clock.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const ownerNegotiatingHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

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
  if (!data) return null;

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
  if (!data) return [];

  return data.map((rowData, index) => incomingTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const incomingTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { cargoId, laycanStart, laycanEnd, loadPort, status, dateReceived, countdown, id } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.CHARTERER_INFORMATION,
          actionText: cargoId,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: laycanStart,
    },
    {
      id,
      value: laycanEnd,
    },
    {
      id,
      value: loadPort,
    },
    {
      id,
      value: status,
      type: TYPE.SEMIBOLD,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      value: dateReceived ? transformDate(dateReceived, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: countdown,
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_OFFER,
          actionText: 'View offer',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

/// ///////////////////////////////////

export const sentCounteroffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => sentCounteroffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const sentCounteroffersTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { cargoId, laycanStart, laycanEnd, loadPort, dateSent, countdown, id } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.CHARTERER_INFORMATION,
          actionText: cargoId,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: laycanStart,
    },
    {
      id,
      value: laycanEnd,
    },
    {
      id,
      value: loadPort,
    },
    {
      id,
      value: dateSent ? transformDate(dateSent, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: countdown,
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_COUNTEROFFER,
          actionText: 'View counteroffer',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

/// ///////////////////////////////////

export const failedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => failedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const failedTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { cargoId, laycanStart, laycanEnd, loadPort, dateFailed, reason, id } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.CHARTERER_INFORMATION,
          actionText: cargoId,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: laycanStart,
    },
    {
      id,
      value: laycanEnd,
    },
    {
      id,
      value: loadPort,
    },
    {
      id,
      value: dateFailed ? transformDate(dateFailed, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: reason,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_FAILED_OFFER,
          actionText: 'View failed offer',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};
