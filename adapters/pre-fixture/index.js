import ClockSVG from '@/assets/images/clock.svg';
import CommentIcon from '@/assets/images/commentMessage.svg';
import { ROLES } from '@/lib';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown } from '@/utils/helpers';

export const ownerPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo: {
      code,
      cargoType,
      totalQuantity,
      loadTerminal: { port: { name: portName, locode } = {} } = {},
    } = {},
    vessel: { details: { name: tankerName } = {} } = {},
    laycanStart,
    laycanEnd,
    expiresAt,
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
      text: cargoType,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: portName && `${portName}${locode && `, ${locode}`}`,
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
      text: calculateCountdown(expiresAt),
      textStyles: 'text-red',
      coverImage: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 14 14" />,
    },
  ];
};

export const chartererPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo: { code, cargoType, totalQuantity, loadTerminal: { port: { name, locode } = {} } = {} } = {},
    laycanStart,
    laycanEnd,
    creationDate,
    expiresAt,
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
      text: calculateCountdown(expiresAt),
      textStyles: 'text-red',
      coverImage: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 14 14" />,
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
    operationYears,
    chartersPerYear,
    avgTonnage,
    registrationCountry,
    searchedCargo: { cargoType } = {},
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
      operationYears,
      chartersPerYear,
      avgTonnage,
      registrationCountry,
    },
    cargoDetails: {
      cargoType,
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

export const prefixtureChartererDetailsAdapter = (data) => {
  if (!data) return {};
  const {
    vessel: { company: { details: { yearsInOperation, numberOfVessels } = {}, estimatedAverageTankerDWT } = {} } = {},
    searchedCargo: { cargoType } = {},
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
      cargoType,
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
