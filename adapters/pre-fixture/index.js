import { arrayAdapter } from '@/adapters/common';
import { countriesAdapter } from '@/adapters/country';
import CommentIcon from '@/assets/images/commentMessage.svg';
import { ROLES } from '@/lib';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import {
  calculateCountdown,
  ensureFileExtension,
  formatCurrency,
  freightFormatter,
  getLocode,
  transformBytes,
} from '@/utils/helpers';

export const ownerPrefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;
  const {
    searchedCargo: { code, cargoType, loadTerminal } = {},
    vessel = {},
    laycanStart,
    laycanEnd,
    expiresAt,
    frozenAt,
    isFailed,
    totalQuantity,
  } = data;

  const { details: { name: tankerName = '', flagOfRegistry } = {} } = vessel || {};

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
    searchedCargo: { code, cargoType, loadTerminal } = {},
    laycanStart,
    laycanEnd,
    expiresAt,
    frozenAt,
    isFailed,
    totalQuantity,
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
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
    isCountdownActive,
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
      freight: `$${formatCurrency(freight)} ${freightFormat?.value} `,
      demurrageRate: `$${formatCurrency(demurrageRate)} per day`,
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
    allowExtension: isCountdownActive && !isCountdownExtendedByOwner,
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
    isCountdownActive,
  };
};

export const prefixtureChartererDetailsAdapter = (data) => {
  if (!data) return {};

  const {
    vessel,
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
    charterer,
    isCountdownActive,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;

  // Safely extract vessel company details with proper null checks
  const yearsInOperation = vessel?.company?.details?.yearsInOperation;
  const numberOfVessels = vessel?.company?.details?.numberOfVessels;
  const estimatedAverageTankerDWT = vessel?.company?.estimatedAverageTankerDWT;

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
      demurrageRate: `$${formatCurrency(demurrageRate)} per day`,
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
    isCountdownActive,
    allowExtension: isCountdownActive && !isCountdownExtendedByCharterer,
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
};

const prefixtureDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return {};

  const {
    id,
    title,
    comments,
    name: fileName,
    extension,
    size,
    createdAt,
    url,
    status,
    deleted: isDocumentDeleted,
  } = data;

  const revokeDeletionForbidden = status === 'Active';

  return [
    {
      value: index,
      disabled: isDocumentDeleted,
    },
    {
      id,
      type: TYPE.SEMIBOLD,
      value: id,
      disabled: isDocumentDeleted,
    },
    {
      id,
      type: TYPE.SEMIBOLD,
      value: title,
      disabled: isDocumentDeleted,
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
      disabled: isDocumentDeleted,
    },
    {
      id,
      value: fileName,
      disabled: isDocumentDeleted,
    },
    {
      id,
      value: extension,
      disabled: isDocumentDeleted,
    },
    {
      id,
      value: `${+transformBytes({ value: size }).toFixed(2) || 0.01} MB`,
      disabled: isDocumentDeleted,
    },
    {
      id,
      value: transformDate(createdAt, 'MMM dd, yyyy'),
      disabled: isDocumentDeleted,
    },
    {
      id,
      editable: !isDocumentDeleted,
      disabled: isDocumentDeleted,
      value: true,
      downloadData: !isDocumentDeleted &&
        url && {
          url,
          fileName: ensureFileExtension(fileName, extension),
        },
      actions: [
        {
          action: revokeDeletionForbidden ? ACTIONS.REQUEST_DOCUMENT_DELETION : ACTIONS.REVOKE_DOCUMENT_DELETION,
          actionText: revokeDeletionForbidden ? 'Delete' : 'Revoke',
          actionVariant: revokeDeletionForbidden ? 'delete' : 'primary',
          actionSize: 'medium',
          actionStyles: 'ml-2.5 w-[68px]',
        },
      ],
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

  return data.map((rowData) => ({
    ...rowData,
    charterer: {
      ...rowData?.charterer,
      registrationCity: {
        ...rowData?.charterer?.registrationCity?.state,
      },
      correspondenceCity: {
        ...rowData?.charterer?.correspondenceCity?.state,
      },
    },
  }));
};

export const responseChartererPrefixtureAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseOwnerAcceptPrefixtureAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const requestAcceptPrefixtureAdapter = ({ data }) => {
  if (!data) return [];
  return {
    dealId: data,
  };
};
