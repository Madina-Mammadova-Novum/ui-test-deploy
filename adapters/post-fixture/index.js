import CommentIcon from '@/assets/images/commentMessage.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { transformBytes } from '@/utils/helpers';

export const postFixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return [];

  const { searchedCargo, vessel, laycanStart, laycanEnd, fixtureDate } = data;

  const {
    code: cargoId,
    cargoType,
    totalQuantity,
    loadTerminal: {
      port: { name: portName, locode: portLocode, countryId },
    },
  } = searchedCargo || {};
  const {
    details: { name: tankerName },
  } = vessel || {};

  return [
    {
      label: 'Cargo id',
      text: cargoId,
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
      text: `${totalQuantity} tons`,
    },
    {
      label: 'Load port',
      text: portName && `${portName}${portLocode && `, ${portLocode}`}`,
      country: { id: countryId },
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
      label: 'Fixture date',
      text: transformDate(fixtureDate, 'MMM dd, yyyy'),
    },
  ];
};

export const postFixtureDetailsAdapter = ({ data }) => {
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
    charterPartyUrl,
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
    charterPartyUrl,
  };
};

const postFixtureDocumentsTabRowDataAdapter = ({ data, index }) => {
  if (!data) return [];
  const { id, title, comments, name, extention, size, createdAt, status, url, deleted: isDocumentDeleted } = data;
  const revokeDeletionForbidden = status === 'Active';

  const fileName = name.split('.').pop() === extention ? name : `${name}${extention}`;

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
      value: name,
      disabled: isDocumentDeleted,
    },
    {
      id,
      value: extention,
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
          fileName,
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

export const postFixtureDocumentsTabRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => postFixtureDocumentsTabRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const filtersAdapter = (formData = {}) => {
  const { cargoId, cargoType, tankerName, rangeDate } = formData || {};

  return {
    CargoCode: cargoId?.value,
    CargoTypeId: cargoType?.value,
    TankerName: tankerName?.value,
    FixtureDateFrom: transformDate(rangeDate?.startDate, 'yyyy-MM-dd'),
    FixtureDateTo: transformDate(rangeDate?.endDate, 'yyyy-MM-dd'),
  };
};
