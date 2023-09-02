import ReactCountryFlag from 'react-country-flag';

import ClockSVG from '@/assets/images/clock.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, ROLES, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown } from '@/utils/helpers';

export const ownerNegotiatingHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { imo, openDate, openPort, details, company } = data;

  return [
    {
      label: 'tanker name',
      text: details?.name,
    },
    {
      label: 'imo',
      text: imo,
    },
    {
      label: 'fleet name',
      text: company?.details?.name,
    },
    {
      label: 'open date',
      text: transformDate(openDate, 'MMM dd, yyyy'),
    },
    {
      label: 'open port',
      text: `${openPort?.name}${openPort?.locode && `, ${openPort?.locode}`}`,
      countryCode: 'us',
    },
  ];
};

export const chartererNegotiatingHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    code,
    cargoType,
    minQuantity,
    maxQuantity,
    loadPort: { name: portName, locode: portLocode, country: { codeISO2 } = {} } = {},
    laycanStart,
    laycanEnd,
    createdAt,
  } = data;

  return [
    {
      label: 'Cargo id',
      text: code,
    },
    {
      label: 'Cargo type',
      text: cargoType,
    },
    {
      label: 'Quantity',
      text: `${minQuantity?.toFixed(1)} - ${maxQuantity?.toFixed(1)} tons`,
    },
    {
      label: 'Load port',
      text: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: codeISO2,
    },
    {
      label: 'Laycan start',
      text: transformDate(laycanStart, 'MMM dd, yyyy'),
    },
    {
      label: 'Laycan end',
      text: transformDate(laycanEnd, 'MMM dd, yyyy'),
    },
    {
      label: 'Creation date',
      text: transformDate(createdAt, 'MMM dd, yyyy'),
    },
  ];
};

export const incomingTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => incomingTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const incomingTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const {
    cargo: {
      code: cargoId,
      loadTerminal: {
        port: { name: portName, locode: portLocode },
      },
    },
    status,
    laycanStart,
    laycanEnd,
    createdAt: dateReceived,
    expiresAt,
    id,
  } = data;

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
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
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
      value: calculateCountdown(expiresAt),
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_OFFER,
          actionText: 'View',
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

  const {
    id,
    vessel: { details: { name, summerDwt } = {}, openPort: { name: portName, locode: portLocode } = {}, openDate } = {},
    status,
    createdAt,
    expiresAt,
  } = data;

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
          actionText: name,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: summerDwt && `${summerDwt} tons`,
    },
    {
      id,
      value: status,
      type: TYPE.SEMIBOLD,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      value: createdAt ? transformDate(createdAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: calculateCountdown(expiresAt),
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_SENT_OFFER,
          actionText: 'View',
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

  const {
    cargo: {
      code,
      loadTerminal: {
        port: { name: portName, locode: portLocode },
      },
    },
    laycanStart,
    laycanEnd,
    dateSent,
    expiresAt,
    id,
  } = data;

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
          actionText: code,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
    },
    {
      id,
      value: dateSent ? transformDate(dateSent, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: calculateCountdown(expiresAt),
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_COUNTEROFFER,
          actionText: 'View',
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

  const {
    vessel: { details: { name, summerDwt } = {}, openDate, openPort: { name: portName, locode: portLocode } = {} } = {},
    createdAt,
    expiresAt,
    id,
  } = data;

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
          actionText: name,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: `${summerDwt} tons`,
    },
    {
      id,
      value: createdAt ? transformDate(createdAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: calculateCountdown(expiresAt),
      type: TYPE.RED,
      icon: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.VIEW_CHARTERER_COUNTEROFFER,
          actionText: 'View',
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

  const {
    cargo: {
      code,
      loadTerminal: {
        port: { name: portName, locode: portLocode },
      },
    },
    laycanStart,
    laycanEnd,
    failedAt,
    reason,
    id,
  } = data;

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
          actionText: code,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
    },
    {
      id,
      value: failedAt ? transformDate(failedAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
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
          actionText: 'View',
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

  const {
    vessel: { details: { name, openPort: { name: portName, locode: portLocode } = {}, summerDwt } = {}, openDate } = {},
    failedAt,
    reason,
    id,
  } = data;

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
          actionText: name,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      icon: <ReactCountryFlag style={{ zoom: 1.3 }} countryCode="us" />,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: `${summerDwt} tons`,
    },
    {
      id,
      value: failedAt ? transformDate(failedAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
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
          actionText: 'View',
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

export const responseOwnerNegotiatingAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};
export const responseChartererNegotiatingAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const responseIncomingOffersAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const responseFailedOffersAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const responseSentCounteroffersAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};
