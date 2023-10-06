import CommentIcon from '@/assets/images/commentMessage.svg';
import { ROLES } from '@/lib';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown, transformBytes } from '@/utils/helpers';

export const ownerPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo: {
      code,
      cargoType: { name: cargoName } = {},
      totalQuantity,
      loadTerminal: { port: { name: portName, locode, country } = {} } = {},
    } = {},
    vessel: { details: { name: tankerName } = {} } = {},
    laycanStart,
    laycanEnd,
    expiresAt,
    frozenAt,
  } = data;

  return [
    {
      label: 'Cargo id',
      text: code,
    },
    {
      label: 'Tanker name',
      text: tankerName,
    },
    {
      label: 'Cargo type',
      text: cargoName,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: portName && `${portName}${locode && `, ${locode}`}`,
      countryCode: country?.codeISO2,
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
      label: 'Countdown',
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
  ];
};

export const chartererPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo: {
      code,
      cargoType: { name: cargoName } = {},
      totalQuantity,
      loadTerminal: { port: { name, locode } = {} } = {},
    } = {},
    laycanStart,
    laycanEnd,
    creationDate,
    expiresAt,
    frozenAt,
  } = data;

  return [
    {
      label: 'Cargo id',
      text: code,
    },
    {
      label: 'Cargo type',
      text: cargoName,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: name && `${name}${locode && `, ${locode}`}`,
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
      text: transformDate(creationDate, 'MMM dd, yyyy'),
    },
    {
      label: 'Countdown',
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
  ];
};

export const prefixtureRowDataAdapter = ({ data, index }) => {
  if (!data) return null;
  const { id, docId, title, comment, docName, extension, size, dateAdded } = data;

  return [
    {
      value: index,
    },
    {
      id,
      value: docId,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      value: title,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      editable: true,
      actions: [
        {
          editIcon: comment ? <CommentIcon /> : '---',
        },
      ],
    },
    {
      id,
      value: docName,
    },
    {
      id,
      value: extension,
    },
    {
      id,
      value: size,
    },
    {
      id,
      value: dateAdded ? transformDate(dateAdded, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.DOWNLOAD,
          actionText: 'Download',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

export const prefixtureRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => prefixtureRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const prefixtureOwnerDetailsAdapter = (data) => {
  if (!data) return {};
  const {
    searchedCargo: { cargoType: { name: cargoName } = {} } = {},
    products = [],
    freight,
    freightFormat,
    demurrageRate,
    layTime,
    demurragePaymentTerm,
    paymentTerm,
    searchedCargo: {
      laycanStart,
      laycanEnd,
      loadTerminal: { name: loadTerminalName, port: { name: loadPortName, locode: loadPortLocode } = {} } = {},
      dischargeTerminal: {
        name: dischargeTerminalName,
        port: { name: dischargePortName, locode: dischargePortLocode } = {},
      } = {},
    } = {},
    charterer: {
      averageTonnagePerCharter,
      estimatedNumberOfChartersPerYear,
      yearsInOperation,
      registrationCity: { country: { name: countryName, codeISO2: countryCode } = {} } = {},
    } = {},
    additionalCharterPartyTerms,
  } = data;

  return {
    releatedCargoeId: data?.searchedCargo?.id,
    partyInformation: {
      operationYears: yearsInOperation,
      chartersPerYear: estimatedNumberOfChartersPerYear || '0',
      avgTonnage: averageTonnagePerCharter || '0',
      registrationCountry: {
        countryName,
        countryCode,
      },
    },
    cargoDetails: {
      cargoType: cargoName,
      products,
    },
    commercialOfferTerms: {
      freight: `${freightFormat} ${freight}`,
      demurrageRate: `$${demurrageRate} per day`,
      laytime: `${layTime} hrs + (6 + 6 hrs)`,
      demurragePaymmentTerms: demurragePaymentTerm?.name,
      paymentTerms: paymentTerm?.name,
    },
    voyageDetails: {
      laycanStart: transformDate(laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(laycanEnd, 'MMM dd, yyyy'),
      loadPort: loadPortName && `${loadPortName}${loadPortLocode && `, ${loadPortLocode}`}`,
      loadTerminal: loadTerminalName,
      dischargePort: dischargePortName && `${dischargePortName}${dischargePortLocode && `, ${dischargePortLocode}`}`,
      dischargeTerminal: dischargeTerminalName,
    },
    additionalCharterPartyTerms,
  };
};

export const prefixtureChartererDetailsAdapter = (data) => {
  if (!data) return {};
  const {
    vessel: { company: { details: { yearsInOperation, numberOfVessels } = {}, estimatedAverageTankerDWT } = {} } = {},
    searchedCargo: { cargoType: { name: cargoName } = {} } = {},
    products = [],
    freight,
    freightFormat,
    demurrageRate,
    layTime,
    demurragePaymentTerm,
    paymentTerm,
    searchedCargo: {
      laycanStart,
      laycanEnd,
      loadTerminal: { name: loadTerminalName, port: { name: loadPortName, locode: loadPortLocode } = {} } = {},
      dischargeTerminal: {
        name: dischargeTerminalName,
        port: { name: dischargePortName, locode: dischargePortLocode } = {},
      } = {},
    } = {},
    additionalCharterPartyTerms,
  } = data;

  return {
    partyInformation: {
      operationYears: yearsInOperation,
      numberOfTankers: numberOfVessels,
      estimatedTankerDWT: estimatedAverageTankerDWT,
    },
    cargoDetails: {
      cargoType: cargoName,
      products,
    },
    commercialOfferTerms: {
      freight: `${freightFormat} ${freight}`,
      demurrageRate: `$${demurrageRate} per day`,
      laytime: `${layTime} hrs + (6 + 6 hrs)`,
      demurragePaymmentTerms: demurragePaymentTerm,
      paymentTerms: paymentTerm,
    },
    voyageDetails: {
      laycanStart: transformDate(laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(laycanEnd, 'MMM dd, yyyy'),
      loadPort: loadPortName && `${loadPortName}${loadPortLocode && `, ${loadPortLocode}`}`,
      loadTerminal: loadTerminalName,
      dischargePort: dischargePortName && `${dischargePortName}${dischargePortLocode && `, ${dischargePortLocode}`}`,
      dischargeTerminal: dischargeTerminalName,
    },
    additionalCharterPartyTerms,
  };
};

const prefixtureDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return [];

  const { id, title, comments, name, extention, size, createdAt, url } = data;

  return [
    {
      value: index,
    },
    {
      id,
      type: TYPE.SEMIBOLD,
      value: id,
    },
    {
      id,
      type: TYPE.SEMIBOLD,
      value: title,
    },
    {
      id,
      editable: comments,
      data: { comments },
      actions: [
        {
          action: ACTIONS.VIEW_COMMENTS,
          editIcon: comments && <CommentIcon />,
        },
      ],
    },
    {
      id,
      value: name,
    },
    {
      id,
      value: extention,
    },
    {
      id,
      value: `${+transformBytes({ value: size }).toFixed(2) || 0.01} MB`,
    },
    {
      id,
      value: transformDate(createdAt, 'MMM dd, yyyy'),
    },
    {
      id,
      type: TYPE.SEMIBOLD_BLUE,
      downloadData: url && {
        url: `https://shiplink-api.azurewebsites.net/v1/file/get/${url}`,
        fileName: `${name}${extention}`,
      },
    },
  ];
};

export const prefixtureDocumentsTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => prefixtureDocumentsTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const prefixtureDetailsAdapter = ({ data, role }) => {
  switch (role) {
    case ROLES.OWNER:
      return prefixtureOwnerDetailsAdapter(data);
    case ROLES.CHARTERER:
      return prefixtureChartererDetailsAdapter(data);
    default:
      return {};
  }
};

export const responseOwnerPrefixtureAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const responseChartererPrefixtureAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const responseOwnerAcceptPrefixtureAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const requestAcceptPrefixtureAdapter = ({ data }) => {
  if (!data) return [];
  return {
    dealId: data,
  };
};
