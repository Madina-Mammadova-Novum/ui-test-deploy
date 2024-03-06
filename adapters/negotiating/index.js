import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, ROLES, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown, getLocode, trimTonValue } from '@/utils/helpers';

export const ownerNegotiatingHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { imo, openDate, openPort, details, fleet } = data;

  return [
    {
      label: 'tanker name',
      text: details?.name,
      textStyles: 'absolute',
    },
    {
      label: 'imo',
      text: imo,
    },
    {
      label: 'fleet name',
      text: fleet?.name,
      textStyles: 'absolute',
    },
    {
      label: 'open date',
      text: transformDate(openDate, 'MMM dd, yyyy'),
      textStyles: 'absolute',
    },
    {
      label: 'open port',
      text: `${openPort?.name}${openPort?.locode && `, ${openPort?.locode}`}`,
      textStyles: 'absolute pl-5',
      countryCode: getLocode(openPort?.locode),
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
    loadPort: { name: portName, locode: portLocode } = {},
    laycanStart,
    laycanEnd,
    createdAt,
  } = data;

  const minValue = parseFloat(minQuantity?.toFixed(1)).toString();
  const maxValue = parseFloat(maxQuantity?.toFixed(1)).toString();

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
      text: `${minValue} - ${maxValue} tons`,
      textStyles: 'absolute',
    },
    {
      label: 'Load port',
      text: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: getLocode(portLocode),
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

export const incomingTabRowsDataAdapter = ({ data, parentId }) => {
  if (!data) return [];

  return data.map((rowData, index) => incomingTabRowDataAdapter({ data: rowData, index: index + 1, parentId }));
};

export const incomingTabRowDataAdapter = ({ data, index, parentId }) => {
  if (!data) return null;

  const { cargo, status, laycanStart, laycanEnd, createdAt: dateReceived, expiresAt, frozenAt, notified, id } = data;

  return [
    {
      value: index,
      freezed: frozenAt,
      notified,
    },
    {
      id,
      notified,
      type: TYPE.SEMIBOLD_BLUE,
      actions: [
        {
          action: ACTIONS.CHARTERER_INFORMATION,
          actionText: cargo?.code,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      freezed: frozenAt,
      editable: true,
    },
    {
      id,
      notified,
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      freezed: frozenAt,
    },
    {
      id,
      notified,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      freezed: frozenAt,
    },
    {
      id,
      notified,
      value: `${cargo?.loadTerminal?.port?.name}${
        cargo?.loadTerminal?.port?.locode && `, ${cargo?.loadTerminal?.port?.locode}`
      }`,
      countryCode: getLocode(cargo?.loadTerminal?.port?.locode),
      freezed: frozenAt,
      available: true,
    },
    {
      id,
      value: status,
      notified,
      type: TYPE.SEMIBOLD,
      freezed: frozenAt,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      freezed: frozenAt,
      notified,
      value: dateReceived ? transformDate(dateReceived, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      freezed: frozenAt,
      notified,
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
    {
      id,
      freezed: frozenAt,
      notified,
      actions: [
        {
          action: ACTIONS.VIEW_OFFER,
          actionText: 'View',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
      data: { parentId },
    },
  ];
};

export const sentOffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => sentOffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const sentOffersTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { id, vessel, status, createdAt, expiresAt, frozenAt, notified } = data;
  const { details: { summerDwt } = {}, openPort: { name: portName, locode: portLocode } = {}, openDate } = vessel || {};

  return [
    {
      value: index,
      freezed: frozenAt,
      notified,
    },
    {
      id,
      notified,
      type: TYPE.SEMIBOLD_BLUE,
      freezed: frozenAt,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: `Tanker #${index}`,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      notified,
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: getLocode(portLocode),
      available: true,
      freezed: frozenAt,
    },
    {
      id,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      freezed: frozenAt,
    },
    {
      id,
      notified,
      value: summerDwt && `${trimTonValue(summerDwt)} tons`,
      freezed: frozenAt,
    },
    {
      id,
      value: status,
      notified,
      type: TYPE.SEMIBOLD,
      freezed: frozenAt,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      notified,
      value: createdAt ? transformDate(createdAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      freezed: frozenAt,
    },
    {
      id,
      freezed: frozenAt,
      notified,
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
    {
      id,
      notified,
      freezed: frozenAt,
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

export const offerTabDataByRole = ({ data, role, parentId }) => {
  switch (role) {
    case ROLES.OWNER:
      return incomingTabRowsDataAdapter({ data, parentId });
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
    frozenAt,
    notified,
    id,
  } = data;

  return [
    {
      value: index,
      notified,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      notified,
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
      notified,
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      value: `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: getLocode(portLocode),
      available: true,
    },
    {
      id,
      notified,
      value: dateSent ? transformDate(dateSent, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
    {
      id,
      notified,
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

export const counteroffersTabRowsDataAdapter = ({ data, parentId }) => {
  if (!data) return [];

  return data.map((rowData, index) => counteroffersTabRowDataAdapter({ data: rowData, index: index + 1, parentId }));
};

export const counteroffersTabRowDataAdapter = ({ data, index, parentId }) => {
  if (!data) return null;

  const { vessel, createdAt, expiresAt, frozenAt, id } = data;
  const { details: { summerDwt } = {}, openPort: { name: portName, locode: portLocode } = {}, openDate } = vessel || {};

  return [
    {
      value: index,
      freezed: frozenAt,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      freezed: frozenAt,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: `Tanker #${index}`,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: getLocode(portLocode),
      freezed: frozenAt,
      available: true,
    },
    {
      id,
      freezed: frozenAt,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      freezed: frozenAt,
      value: summerDwt && `${trimTonValue(summerDwt)} tons`,
    },
    {
      id,
      freezed: frozenAt,
      value: createdAt ? transformDate(createdAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
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
      data: { parentId },
    },
  ];
};

export const counteroffersTabDataByRole = ({ data, role, parentId }) => {
  switch (role) {
    case ROLES.OWNER:
      return sentCounteroffersTabRowsDataAdapter({ data });
    case ROLES.CHARTERER:
      return counteroffersTabRowsDataAdapter({ data, parentId });
    default:
      return [];
  }
};

export const ownerFailedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => ownerFailedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const ownerFailedTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { cargo, laycanStart, laycanEnd, failedAt, notified, reason, id } = data;

  return [
    {
      value: index,
      notified,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      freezed: false,
      notified,
      actions: [
        {
          action: ACTIONS.CHARTERER_INFORMATION,
          actionText: cargo?.code,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      freezed: false,
      notified,
      value: laycanStart ? transformDate(laycanStart, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      freezed: false,
      notified,
      value: laycanEnd ? transformDate(laycanEnd, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      freezed: false,
      notified,
      value: cargo?.loadTerminal?.port && `${cargo?.loadTerminal?.port?.name}, ${cargo?.loadTerminal?.port?.locode}`,
      countryCode: getLocode(cargo?.loadTerminal?.port?.locode),
      available: true,
    },
    {
      id,
      freezed: false,
      notified,
      value: failedAt ? transformDate(failedAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      freezed: false,
      value: reason,
      notified,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      freezed: false,
      notified,
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

  const { vessel, failedAt, reason, id, notified } = data;
  const { details, openDate } = vessel || {};

  return [
    {
      value: index,
      notified,
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      notified,
      actions: [
        {
          action: ACTIONS.TANKER_INFORMATION,
          actionText: `Tanker #${index}`,
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
      editable: true,
    },
    {
      id,
      notified,
      value: details?.port?.name && `${details?.port?.name}${details?.port?.locode && `, ${details?.port?.locode}`}`,
      countryCode: getLocode(details?.port?.locode),
      available: true,
    },
    {
      id,
      notified,
      value: openDate ? transformDate(openDate, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      value: details?.summerDwt && `${trimTonValue(details?.summerDwt)} tons`,
    },
    {
      id,
      notified,
      value: failedAt ? transformDate(failedAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      value: reason,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      notified,
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

export const prefilledSearchDataAdapter = ({ data }) => {
  if (!data) return [];
  const {
    laycanStart,
    laycanEnd,
    searchedCargo: { loadTerminal = {}, dischargeTerminal = {}, cargoType: { id: cargoId, name: cargoName } = {} } = {},
    products,
  } = data;
  const {
    id: loadTerminalId,
    name: loadTerminalName,
    port: { id: loadPortId, name: loadPortName, locode: loadPortLocode } = {},
  } = loadTerminal;
  const {
    id: dischargeTerminalId,
    name: dischargeTerminalName,
    port: { id: dischargePortId, name: dischargePortName, locode: dischargePortLocode } = {},
  } = dischargeTerminal;

  // Response data
  return {
    laycanStart,
    laycanEnd,
    loadPort: { label: `${loadPortName}, ${loadPortLocode}`, value: loadPortId },
    loadTerminal: { label: loadTerminalName, value: loadTerminalId },
    dischargePort: { label: `${dischargePortName}, ${dischargePortLocode}`, value: dischargePortId },
    dischargeTerminal: { label: dischargeTerminalName, value: dischargeTerminalId },
    cargoType: { label: cargoName, value: cargoId },
    productsByIndex: Array.from({ length: products.length }, (_, index) => index),
    products: products.map((product) => ({
      density: product.density,
      product: {
        label: product.productName,
        value: product.id,
      },
    })),
  };
};

export const notifiedNegotiatingDataAdapter = ({ data, fleetId, tab }) => {
  const dataByTab = {
    counteroffers: data.map((el) => {
      return {
        ...el,
        notified: el.id === fleetId || false,
      };
    }),
    failed: data.map((el) => {
      return {
        ...el,
        notified: el.id === fleetId || false,
      };
    }),
    incoming: data.map((el) => {
      return {
        ...el,
        notified: el.id === fleetId || false,
      };
    }),
  };

  return dataByTab[tab];
};
