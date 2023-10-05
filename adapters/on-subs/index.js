import ClockSVG from '@/assets/images/clock.svg';
import { DynamicCountdownTimer } from '@/units';
import { transformDate } from '@/utils/date';
import { calculateCountdown } from '@/utils/helpers';

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
      countryCode: loadPortCountry?.codeISO2,
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
      text: <DynamicCountdownTimer date={calculateCountdown(expiresAt)} />,
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
      countryCode: loadPortCountry?.codeISO2,
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
      text: calculateCountdown(expiresAt),
      textStyles: 'text-red',
      coverImage: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 14 14" />,
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

  const bankInfoValues = bankDetails?.split('\r\n');
  const bankName = bankInfoValues.splice(0, 1);
  const bankInfoTitles = ['Account Number', 'Bank Code', 'BIC (SWIFT-CODE)', 'IBAN', 'Bank Address'];

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
        bankName,
        bankDetails: bankInfoTitles.map((point, index) => ({ title: point, text: bankInfoValues[index] })),
      },
    },
    additionalCharterPartyTerms,
  };
};
