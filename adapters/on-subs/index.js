import CommentIcon from '@/assets/images/commentMessage.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { calculateCountdown, transformBytes } from '@/utils/helpers';

export const ownerOnSubsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;
  const {
    searchedCargo: {
      code,
      cargoType,
      totalQuantity,
      laycanStart,
      laycanEnd,
      loadTerminal: { port: { name: loadPortName, locode: loadPortLocode, country: loadPortCountry } } = {},
    } = {},
    vessel: { details: { name: tankerName } = {} } = {},
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
      text: cargoType?.name,
    },
    {
      label: 'Quantity',
      text: totalQuantity && `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: loadPortName && `${loadPortName}${loadPortLocode && `, ${loadPortLocode}`}`,
      country: loadPortCountry,
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
        date: calculateCountdown(expiresAt),
      },
    },
  ];
};

export const chartererOnSubsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;
  const {
    searchedCargo: {
      code,
      cargoType,
      totalQuantity,
      laycanStart,
      laycanEnd,
      loadTerminal: { port: { name: loadPortName, locode: loadPortLocode, country: loadPortCountry } } = {},
    } = {},
    vessel: { details: { name: tankerName } = {} } = {},
    expiresAt,
    createdAt,
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
      text: cargoType?.name,
    },
    {
      label: 'Quantity',
      text: totalQuantity && `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: loadPortName && `${loadPortName}${loadPortLocode && `, ${loadPortLocode}`}`,
      country: loadPortCountry,
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
    {
      label: 'Countdown',
      countdownData: {
        date: calculateCountdown(expiresAt),
      },
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
    additionalCharterPartyTerms,
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
    bankDetails,
    isCountdownExtendedByCharterer,
  } = data;

  const { name: registrationCityName, country: registrationCountry } = registrationCity || {};
  const { name: correspondenceCityName, country: correspondenceCountry } = correspondenceCity || {};
  const {
    name: loadTerminalName,
    port: { name: loadPortName, locode: loadPortLocode, country: loadPortCountry },
  } = loadTerminal || {};
  const {
    name: dischargeTerminalName,
    port: { name: dischargePortName, locode: dischargePortLocode, country: dischargePortCountry },
  } = dischargeTerminal || {};
  const { accountName, accountNumber, bankAddress, bankCode, iban, swift } = bankDetails || {};

  return {
    chartererInformation: [
      {
        title: 'Charterer',
        text: chartererName,
      },
      {
        title: 'Registration Adress',
        text: `${registrationAddress}, ${registrationCityName}, ${registrationCountry?.name}`,
      },
      {
        title: 'Correspondence Adress',
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
          countryCode: flagOfRegistry?.codeISO2,
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
          text: heat || 'Not Aplicable',
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
            text: loadPortName && `${loadPortName}${loadPortLocode && `, ${loadPortLocode}`}`,
            countryCode: loadPortCountry?.codeISO2,
          },
          {
            title: 'Load terminal',
            text: loadTerminalName,
          },
        ],
        [
          {
            title: 'Discharge port',
            text: dischargePortName && `${dischargePortName}${dischargePortLocode && `, ${dischargePortLocode}`}`,
            countryCode: dischargePortCountry?.codeISO2,
          },
          {
            title: 'Discharge terminal',
            text: dischargeTerminalName,
          },
        ],
      ],
    },
    commercialOfferTerms: {
      generalOfferTerms: [
        {
          title: 'Freight',
          text: `${freightFormat?.value} ${freight}`,
        },
        {
          title: 'Demurrage rate',
          text: `$${demurrageRate} per day`,
        },
        {
          title: 'Laytime + NOR',
          text: `${layTime} hrs + (6 + 6 hrs)`,
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
      bankInfo: {
        bankName: accountName,
        bankDetails: [
          {
            title: 'Account Number',
            text: accountNumber,
          },
          {
            title: 'Bank Code',
            text: bankCode,
          },
          {
            title: 'BIC (SWIFT-CODE)',
            text: swift,
          },
          {
            title: 'IBAN',
            text: iban,
          },
          {
            title: 'Bank Address',
            text: bankAddress,
          },
        ],
      },
    },
    additionalCharterPartyTerms,
    allowExtension: !isCountdownExtendedByCharterer,
  };
};

const onSubsDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return [];
  const { id, title, comments, name, extention, size, createdAt, status, url } = data;
  const revokeDeletionForbidden = status === 'Active';

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
      value: status,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      editable: true,
      value: true,
      downloadData: url && {
        url: `https://shiplink-api.azurewebsites.net/v1/file/get/${url}`,
        fileName: `${name}${extention}`,
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
  const { offerId, title, comment, fileDetails, file } = data;
  const { name, size } = fileDetails || {};
  const extension = name?.split('.')?.pop();
  return {
    dealId: offerId,
    title,
    name,
    comments: comment,
    size,
    extention: extension,
    url: file,
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
    reason: 'placeholder',
  };
};

export const responseFailTheSubsAdapter = ({ data }) => {
  if (!data) return {};
  return data;
};
