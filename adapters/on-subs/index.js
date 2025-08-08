import { objectAdapter } from '@/adapters/common';
import { countriesAdapter } from '@/adapters/country';
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
import CommentIcon from '@/assets/images/commentMessage.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import {
  calculateCountdown,
  ensureFileExtension,
  formatCurrency,
  freightFormatter,
  getLocode,
  transformBytes,
} from '@/utils/helpers';

export const ownerOnSubsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo,
    vessel,
    expiresAt,
    frozenAt,
    isFailed,
    laycanEnd,
    laycanStart,
    totalQuantity,
    countdownStatus,
  } = data;

  return [
    {
      label: 'Cargo id',
      text: searchedCargo?.code,
      freezed: frozenAt,
    },
    {
      label: 'Tanker name',
      text: vessel?.details?.name,
      freezed: frozenAt,
      countryCode:
        getLocode(vessel?.details?.flagOfRegistry?.codeISO2) || getLocode(vessel?.details?.flagOfRegistry?.codeISO3),
    },
    {
      label: 'Cargo type',
      text: searchedCargo?.cargoType?.name,
      freezed: frozenAt,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity || 0} tons`,
      freezed: frozenAt,
    },
    {
      label: 'Load port',
      text:
        searchedCargo?.loadTerminal &&
        `${searchedCargo?.loadTerminal?.port?.name}, ${searchedCargo?.loadTerminal?.port?.locode}`,
      countryCode: getLocode(searchedCargo?.loadTerminal?.port?.locode),
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
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
      },
      isFailed,
    },
    {
      label: 'Status',
      textStyles: isFailed ? 'text-red' : 'text-yellow',
      freezed: frozenAt,
      text: isFailed ? 'Failed' : 'Frozen',
      isFailed: isFailed || frozenAt,
    },
  ];
};

export const chartererOnSubsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const {
    searchedCargo,
    vessel,
    expiresAt,
    frozenAt,
    createdAt,
    isFailed,
    laycanEnd,
    laycanStart,
    totalQuantity,
    countdownStatus,
  } = data;

  return [
    {
      label: 'Cargo id',
      text: searchedCargo?.code,
      freezed: frozenAt,
    },
    {
      label: 'Tanker name',
      text: vessel?.details?.name,
      freezed: frozenAt,
      countryCode:
        getLocode(vessel?.details?.flagOfRegistry?.codeISO2) || getLocode(vessel?.details?.flagOfRegistry?.codeISO3),
    },
    {
      label: 'Cargo type',
      text: searchedCargo?.cargoType?.name,
      freezed: frozenAt,
    },
    {
      label: 'Quantity',
      text: `${totalQuantity || 0} tons`,
      freezed: frozenAt,
    },
    {
      label: 'Load port',
      text:
        searchedCargo?.loadTerminal?.port &&
        `${searchedCargo?.loadTerminal?.port?.name}, ${searchedCargo?.loadTerminal?.port?.locode}`,
      countryCode: getLocode(searchedCargo?.loadTerminal?.port?.locode),
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
      label: 'Creation date',
      text: transformDate(createdAt, 'MMM dd, yyyy'),
      freezed: frozenAt,
    },
    {
      label: 'Countdown',
      textStyles: 'absolute top-1 lg:relative lg:top-0',
      freezed: frozenAt,
      countdownData: {
        date: calculateCountdown(expiresAt),
        autoStart: countdownStatus === 'Running',
        status: countdownStatus,
      },
      isFailed,
    },
    {
      label: 'Status',
      textStyles: isFailed ? 'text-red' : 'text-yellow',
      freezed: frozenAt,
      text: isFailed ? 'Failed' : 'Frozen',
      isFailed: isFailed || frozenAt,
    },
  ];
};

export const onSubsDetailsAdapter = ({ data }) => {
  if (!data) return {};

  const {
    charterer: {
      name: chartererName,
      registrationAddress,
      registrationCity,
      correspondenceAddress,
      correspondenceCity,
    } = {},
    vessel: {
      details: {
        registeredOwner,
        technicalOperator,
        commercialOperator,
        disponentOwner,
        name: tankerName,
        flagOfRegistry,
      } = {},
    } = {},
    searchedCargo: { cargoType, loadTerminal, dischargeTerminal } = {},
    heat,
    products,
    laycanStart,
    laycanEnd,
    freightFormat,
    freight,
    demurrageRate,
    layTime,
    demurragePaymentTerm,
    paymentTerm,
    itinerary,
    lastCargo,
    secondCargo,
    thirdCargo,
    lastSire,
    approvals,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
    allowExtension,
    extensionTimeOptions,
    taskId,
    countdownStatus,
    assignTo,
    initiator,
    extensionRequests = [],
    // Needed for countdown extension updates in header
    expiresAt,
  } = data;

  const { name: registrationCityName, country: registrationCountry } = registrationCity || {};
  const { name: correspondenceCityName, country: correspondenceCountry } = correspondenceCity || {};

  return {
    chartererInformation: [
      {
        title: 'Charterer',
        text: chartererName,
      },
      {
        title: 'Registration Address',
        text: `${registrationAddress}, ${registrationCityName}, ${registrationCountry?.name}`,
      },
      {
        title: 'Correspondence Address',
        text: `${correspondenceAddress}, ${correspondenceCityName}, ${correspondenceCountry?.name}`,
      },
    ],
    tankerInformation: {
      generalInformation: [
        {
          title: 'Registered owner',
          text: registeredOwner,
        },
        {
          title: 'Technical operator',
          text: technicalOperator,
        },
        {
          title: 'Commercial operator',
          text: commercialOperator,
        },
        {
          title: 'Disponent owner',
          text: disponentOwner,
        },
        {
          title: 'Tanker name',
          text: tankerName,
          countryCode: flagOfRegistry?.codeISO2 || flagOfRegistry?.codeISO3,
        },
        {
          title: 'Itinerary',
          text: itinerary,
        },
      ],
      lastCargoes: [
        {
          title: 'Last cargo',
          text: lastCargo,
        },
        {
          title: '2nd last',
          text: secondCargo,
        },
        {
          title: '3rd last',
          text: thirdCargo,
        },
      ],
      additionalInformation: [
        {
          title: 'Last sire',
          text: lastSire,
        },
        {
          title: 'Approvals',
          text: approvals,
        },
      ],
    },
    cargoDetails: {
      cargoInformation: [
        {
          title: 'Cargo Type',
          text: cargoType?.name,
        },
        {
          title: 'Heat',
          text: heat || 'Not Applicable',
        },
      ],
      products,
    },
    voyageDetails: {
      voyageDates: [
        {
          title: 'Laycan start',
          text: transformDate(laycanStart, 'MMM dd, yyyy'),
        },
        {
          title: 'Laycan end',
          text: transformDate(laycanEnd, 'MMM dd, yyyy'),
        },
      ],
      voyagePorts: [
        [
          {
            title: 'Load port',
            text: loadTerminal?.port && `${loadTerminal?.port?.name}, ${loadTerminal?.port?.locode}`,
            countryCode: loadTerminal?.port && getLocode(loadTerminal?.port?.locode),
          },
          {
            title: 'Load terminal',
            text: loadTerminal?.name,
          },
        ],
        [
          {
            title: 'Discharge port',
            text: dischargeTerminal?.port && `${dischargeTerminal?.port?.name}, ${dischargeTerminal?.port?.locode}`,
            countryCode: dischargeTerminal?.port && getLocode(dischargeTerminal?.port?.locode),
          },
          {
            title: 'Discharge terminal',
            text: dischargeTerminal?.name,
          },
        ],
      ],
    },
    commercialOfferTerms: {
      generalOfferTerms: [
        {
          title: 'Freight',
          text: freightFormatter({ format: freightFormat?.value, value: freight }),
        },
        {
          title: 'Demurrage rate',
          text: demurrageRate && `$${formatCurrency(demurrageRate)} per day`,
        },
        {
          title: 'Laytime + NOR',
          text: layTime && `${layTime} hrs + (6 + 6 hrs)`,
        },
        {
          title: 'Undisputed demurrage payment terms',
          text: demurragePaymentTerm?.name,
        },
        {
          title: 'Payment term',
          text: paymentTerm?.name,
        },
      ],
    },
    allowExtension,
    extensionTimeOptions: extensionTimeOptionsAdapter({ options: extensionTimeOptions }),
    taskId,
    // Expose raw countdown data to allow local state updates (e.g., after approve extension)
    expiresAt,
    countdownStatus,
    isCountdownActive: countdownStatus === 'Running',
    assignTo,
    initiator,
    extensionRequests,
    additionalDischargeOptions,
    sanctionedCountries: countriesAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
};

const onSubsDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return {};
  const {
    id,
    title,
    comments,
    name: fileName,
    extension,
    size,
    createdAt,
    status,
    url,
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
      value: status,
      icon: <StatusIndicator status={status} />,
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

export const onSubsDocumentsTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => onSubsDocumentsTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const onSubsAddDocumentAdapter = ({ data }) => {
  if (!data) return {};

  const { offerId, title, comment, files = [], file, fileDetails, dealDocumentRequestId } = data;

  // Handle backward compatibility for single file
  if (file && fileDetails && !files.length) {
    const { name, size } = fileDetails;
    const extension = name?.split('.')?.pop();
    return {
      dealId: offerId,
      title,
      comments: comment,
      files: [
        {
          name,
          size,
          extension,
          url: file,
        },
      ],
      ...(dealDocumentRequestId && { dealDocumentRequestId }),
    };
  }

  // Handle multiple files
  const filesArray = files.map((fileItem) => ({
    name: fileItem.name,
    size: fileItem.size,
    extension: fileItem.extension,
    url: fileItem.url,
  }));

  return {
    dealId: offerId,
    title,
    comments: comment,
    files: filesArray,
    ...(dealDocumentRequestId && { dealDocumentRequestId }),
  };
};

export const onSubsRequestDocumentDeletionAdapter = ({ data }) => {
  if (!data) return {};
  const { documentId } = data;
  return {
    documentId,
  };
};

export const onSubsRevokeDocumentDeletionAdapter = ({ data }) => {
  if (!data) return {};
  const { documentId } = data;
  return {
    documentId,
  };
};

export const failTheSubsAdapter = ({ data }) => {
  if (!data) return {};

  const { offerId } = data;

  return {
    dealId: offerId,
    reason: 'Declined per user choice.',
  };
};

export const responseFailTheSubsAdapter = ({ data }) => {
  return objectAdapter(data);
};
