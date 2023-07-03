import ClockSVG from '@/assets/images/clock.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, ROLES, TYPE } from '@/lib/constants';
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

export const sentOffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => sentOffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const sentOffersTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { id, tankerName, openPort, openDate, dwt, status, dateSent, countdown } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: tankerName,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: openPort,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: dwt,
    },
    {
      id,
      value: status,
      type: TYPE.SEMIBOLD,
      icon: <StatusIndicator status={status} />,
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
          action: ACTIONS.VIEW_SENT_OFFER,
          actionText: 'View offer',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

export const offerTabDataByRole = ({ data, role }) => {
  switch (role) {
    case ROLES.OWNER:
      return incomingTabRowsDataAdapter({ data });
    case ROLES.CHARTERER:
      return sentOffersTabRowsDataAdapter({ data });
    default:
      return [];
  }
};

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

export const counteroffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => counteroffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const counteroffersTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { tankerName, openPort, openDate, dwt, dateReceived, countdown, id } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: tankerName,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: openPort,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: dwt,
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
          action: ACTIONS.VIEW_CHARTERER_COUNTEROFFER,
          actionText: 'View counteroffer',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

export const counteroffersTabDataByRole = ({ data, role }) => {
  switch (role) {
    case ROLES.OWNER:
      return sentCounteroffersTabRowsDataAdapter({ data });
    case ROLES.CHARTERER:
      return counteroffersTabRowsDataAdapter({ data });
    default:
      return [];
  }
};

/// ///////////////////////////////////

export const ownerFailedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => ownerFailedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const ownerFailedTabRowDataAdapter = ({ data, index }) => {
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

export const chartererFailedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => chartererFailedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const chartererFailedTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { tankerName, openPort, openDate, dwt, dateFailed, reason, id } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: tankerName,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: openPort,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: dwt,
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

export const failedTabDataByRole = ({ data, role }) => {
  switch (role) {
    case ROLES.OWNER:
      return ownerFailedTabRowsDataAdapter({ data });
    case ROLES.CHARTERER:
      return chartererFailedTabRowsDataAdapter({ data });
    default:
      return [];
  }
};
