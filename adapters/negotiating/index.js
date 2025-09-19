import { arrayAdapter } from '@/adapters/common';
import { countriesAdapter } from '@/adapters/country';
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
      countryCode: getLocode(details?.flagOfRegistry?.codeISO2) || getLocode(details?.flagOfRegistry?.codeISO3),
    },
    {
      label: 'imo',
      text: imo,
    },
    {
      label: 'fleet name',
      text: fleet?.name,
    },
    {
      label: 'open date',
      text: transformDate(openDate, 'MMM dd, yyyy'),
    },
    {
      label: 'open port',
      text: openPort?.name && `${openPort?.name}${openPort?.locode && `, ${openPort?.locode}`}`,
      countryCode: getLocode(openPort?.locode),
    },
  ];
};

export const chartererNegotiatingHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { code, cargoType, loadPort, laycanStart, laycanEnd, createdAt, totalQuantity } = data;

  const quantity = parseFloat((totalQuantity ?? 0).toFixed(1)).toString();

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
      text: `${quantity} tons`,
    },
    {
      label: 'Load port',
      text: loadPort && `${loadPort?.name}, ${loadPort?.locode}`,
      countryCode: getLocode(loadPort?.locode),
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

const incomingTabRowsDataAdapter = ({ data, parentId }) => {
  if (!data) return [];

  return data.map((rowData, index) => incomingTabRowDataAdapter({ data: rowData, index: index + 1, parentId }));
};

const incomingTabRowDataAdapter = ({ data, index, parentId }) => {
  if (!data) return null;

  const {
    cargo,
    status,
    laycanStart,
    laycanEnd,
    createdAt: dateReceived,
    expiresAt,
    frozenAt,
    notified,
    id,
    countdownStatus,
  } = data;

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
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
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

const sentOffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => sentOffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

const sentOffersTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { id, vessel, status, createdAt, expiresAt, frozenAt, notified, countdownStatus } = data;
  const { details: { summerDwt } = {}, openPort, openDate } = vessel || {};

  const portName = openPort?.name || null;
  const portLocode = openPort?.locode || null;

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
      notified,
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
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
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

const sentCounteroffersTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => sentCounteroffersTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

const sentCounteroffersTabRowDataAdapter = ({ data, index }) => {
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
    expiresAt,
    notified,
    id,
    createdAt,
    countdownStatus,
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
      value: createdAt ? transformDate(createdAt, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      notified,
      countdownData: {
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
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

const counteroffersTabRowsDataAdapter = ({ data, parentId }) => {
  if (!data) return [];

  return data.map((rowData, index) => counteroffersTabRowDataAdapter({ data: rowData, index: index + 1, parentId }));
};

const counteroffersTabRowDataAdapter = ({ data, index, parentId }) => {
  if (!data) return null;

  const { vessel, createdAt, expiresAt, frozenAt, id, countdownStatus } = data;

  const { details: { summerDwt } = {} } = vessel || {};
  const openPort = vessel?.openPort || {};
  const portName = openPort?.name || null;
  const portLocode = openPort?.locode || null;
  const openDate = vessel?.openDate;

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
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
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

const ownerFailedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => ownerFailedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

const ownerFailedTabRowDataAdapter = ({ data, index }) => {
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

const chartererFailedTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => chartererFailedTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

const chartererFailedTabRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { vessel, failedAt, reason, id, notified } = data;
  const { details, openPort, openDate } = vessel || {};

  const portName = openPort?.name || null;
  const portLocode = openPort?.locode || null;

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
      value: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      countryCode: getLocode(portLocode),
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
  return arrayAdapter(data);
};
export const responseChartererNegotiatingAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseIncomingOffersAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseFailedOffersAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseOffersAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseSentCounteroffersAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const prefilledSearchDataAdapter = ({ data, isAlternative = false }) => {
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
      quantity: product.quantity,
      tolerance: product.tolerance,
      product: {
        label: product.productName,
        value: product.id,
      },
    })),
    showAdditionalDischarge: false,
    isAlternative,
  };
};

export const prefilledSaveSearchDataAdapter = ({ data, isSavedSearch = false, savedSearchId = null }) => {
  if (!data) return [];

  const {
    laycanStart,
    laycanEnd,
    loadTerminal = {},
    dischargeTerminal = {},
    cargoType: { id: cargoId, name: cargoName } = {},
    cargoes: products,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
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
    loadPort: {
      label: `${loadPortName}, ${loadPortLocode}`,
      value: loadPortId,
      countryFlag: getLocode(loadPortLocode),
    },
    loadTerminal: { label: loadTerminalName, value: loadTerminalId },
    dischargePort: {
      label: `${dischargePortName}, ${dischargePortLocode}`,
      value: dischargePortId,
      countryFlag: getLocode(dischargePortLocode),
    },
    dischargeTerminal: { label: dischargeTerminalName, value: dischargeTerminalId },
    cargoType: { label: cargoName, value: cargoId },
    productsByIndex: Array.from({ length: products.length }, (_, index) => index),
    products: products.map((product) => ({
      density: product.referenceDensity,
      quantity: product.quantity,
      tolerance: product.tolerance,
      product: {
        label: product.name,
        value: product.productId,
      },
    })),
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
    showAdditionalDischarge:
      additionalDischargeOptions?.isAllSelected || additionalDischargeOptions?.selected?.length > 0,
    isSavedSearch,
    savedSearchId,
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
