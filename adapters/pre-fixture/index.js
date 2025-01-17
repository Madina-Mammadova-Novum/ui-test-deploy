import { countriesAdapter } from '@/adapters/country';
import CommentIcon from '@/assets/images/commentMessage.svg';
import { ROLES } from '@/lib';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown, ensureFileExtension, freightFormatter, getLocode, transformBytes } from '@/utils/helpers';

export const ownerPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;
  const {
    searchedCargo: { code, cargoType, totalQuantity, loadTerminal } = {},
    vessel: { details: { name: tankerName = '', flagOfRegistry } = {} } = {},
    laycanStart,
    laycanEnd,
    expiresAt,
    frozenAt,
    isFailed,
  } = data;

  const { port: { name: portName, locode } = {} } = loadTerminal || {};

  return [
    {
      label: 'Cargo id',
      text: code,
      freezed: frozenAt,
    },
    {
      label: 'Tanker name',
      text: tankerName && tankerName,
      countryCode: getLocode(flagOfRegistry?.codeISO2) || getLocode(flagOfRegistry?.codeISO3),
      freezed: frozenAt,
    },
    {
      label: 'Cargo type',
      text: cargoType?.name,
      freezed: frozenAt,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity} tons`,
      freezed: frozenAt,
    },
    {
      label: 'Load port',
      text: portName && `${portName}${locode && `, ${locode}`}`,
      freezed: frozenAt,
      countryCode: getLocode(locode),
    },
    {
      label: 'Laycan start',
      freezed: frozenAt,
      text: transformDate(laycanStart, 'MMM dd, yyyy'),
    },
    {
      label: 'Laycan end',
      freezed: frozenAt,
      text: transformDate(laycanEnd, 'MMM dd, yyyy'),
    },
    {
      label: 'Countdown',
      textStyles: 'absolute top-1 lg:relative lg:top-0',
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
    {
      label: 'Status',
      textStyles: 'text-red',
      freezed: frozenAt,
      text: 'Failed',
      isFailed,
    },
  ];
};

export const chartererPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo: { code, cargoType, totalQuantity, loadTerminal } = {},
    laycanStart,
    laycanEnd,
    expiresAt,
    frozenAt,
    isFailed,
  } = data;
  const { port: { name, locode } = {} } = loadTerminal || {};

  return [
    {
      label: 'Cargo id',
      text: code,
      freezed: frozenAt,
    },
    {
      label: 'Cargo type',
      text: cargoType?.name,
      freezed: frozenAt,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity} tons`,
      freezed: frozenAt,
    },
    {
      label: 'Load port',
      text: name && `${name}${locode && `, ${locode}`}`,
      countryCode: getLocode(locode),
      freezed: frozenAt,
    },
    {
      label: 'Laycan start',
      text: transformDate(laycanStart, 'MMM dd, yyyy'),
      freezed: frozenAt,
    },
    {
      label: 'Laycan end',
      text: transformDate(laycanEnd, 'MMM dd, yyyy'),
      freezed: frozenAt,
    },
    {
      label: 'Countdown',
      textStyles: 'absolute top-1 lg:relative lg:top-0',
      countdownData: {
        date: calculateCountdown(expiresAt, frozenAt),
        autoStart: !frozenAt,
      },
    },
    {
      label: 'Status',
      textStyles: 'text-red',
      freezed: frozenAt,
      text: 'Failed',
      isFailed,
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
    searchedCargo: { cargoType } = {},
    products = [],
    freight,
    freightFormat,
    demurrageRate,
    layTime,
    demurragePaymentTerm,
    paymentTerm,
    isCountdownExtendedByOwner,
    searchedCargo: { laycanStart, laycanEnd, loadTerminal, dischargeTerminal } = {},
    charterer: { averageTonnagePerCharter, estimatedNumberOfChartersPerYear, yearsInOperation, registrationCity } = {},
    additionalCharterPartyTerms,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;
  const { country: registrationCountry } = registrationCity || {};

  return {
    relatedCargoId: data?.searchedCargo?.id,
    partyInformation: {
      operationYears: yearsInOperation,
      chartersPerYear: estimatedNumberOfChartersPerYear || '0',
      avgTonnage: averageTonnagePerCharter || '0',
      registrationCountry: {
        countryName: registrationCountry?.name,
        countryCode: registrationCountry?.codeISO2,
      },
    },
    cargoDetails: {
      cargoType: cargoType?.name,
      products,
    },
    commercialOfferTerms: {
      freight: `${freight} ${freightFormat?.value} `,
      demurrageRate: `$${demurrageRate} per day`,
      laytime: `${layTime} hrs + (6 + 6 hrs)`,
      demurragePaymentTerms: demurragePaymentTerm?.name,
      paymentTerms: paymentTerm?.name,
    },
    voyageDetails: {
      laycanStart: transformDate(laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(laycanEnd, 'MMM dd, yyyy'),
      loadPort: `${loadTerminal?.port?.name}${loadTerminal?.port?.locode && `, ${loadTerminal?.port?.locode}`}`,
      loadPortCountryCode: getLocode(loadTerminal?.port?.locode),
      loadTerminal: loadTerminal?.name || null,
      dischargePort: `${dischargeTerminal?.port?.name}${
        dischargeTerminal?.port?.locode && `, ${dischargeTerminal?.port?.locode}`
      }`,
      dischargePortCountryCode: getLocode(dischargeTerminal?.port?.locode),
      dischargeTerminal: dischargeTerminal?.name,
    },
    additionalCharterPartyTerms,
    allowExtension: additionalCharterPartyTerms?.length && !isCountdownExtendedByOwner,
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
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
    isCountdownExtendedByCharterer,
    searchedCargo: { laycanStart, laycanEnd, loadTerminal, dischargeTerminal },
    additionalCharterPartyTerms,
    charterer,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;

  return {
    partyInformation: {
      operationYears: `${yearsInOperation}`,
      numberOfTankers: `${numberOfVessels}`,
      estimatedTankerDWT: `${estimatedAverageTankerDWT}`,
      country: charterer?.registrationCity?.country || null,
    },
    cargoDetails: {
      cargoType: cargoType?.name,
      products,
    },
    commercialOfferTerms: {
      freight: freightFormatter({ value: freight, format: freightFormat.value }),
      demurrageRate: `$${demurrageRate} per day`,
      laytime: `${layTime} hrs + (6 + 6 hrs)`,
      demurragePaymentTerms: demurragePaymentTerm?.name,
      paymentTerms: paymentTerm?.name,
    },
    voyageDetails: {
      laycanStart: transformDate(laycanStart, 'MMM dd, yyyy'),
      laycanEnd: transformDate(laycanEnd, 'MMM dd, yyyy'),
      loadPort: loadTerminal?.port && `${loadTerminal?.port?.name}, ${loadTerminal?.port?.locode}`,
      loadPortCountryCode: getLocode(loadTerminal?.port?.locode),
      loadTerminal: loadTerminal?.name,
      dischargePort: dischargeTerminal?.port && `${dischargeTerminal?.port?.name}, ${dischargeTerminal?.port?.locode}`,
      dischargePortCountryCode: getLocode(dischargeTerminal?.port?.locode),
      dischargeTerminal: dischargeTerminal?.name,
    },
    additionalCharterPartyTerms,
    allowExtension: additionalCharterPartyTerms?.length && !isCountdownExtendedByCharterer,
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
};

const prefixtureDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return {};

  const { id, title, comments, name: fileName, extension, size, createdAt, url } = data;

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
      value: fileName,
    },
    {
      id,
      value: extension,
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
        url,
        fileName: ensureFileExtension(fileName, extension),
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
