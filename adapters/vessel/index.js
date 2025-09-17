import { postProductsAdapter } from '@/adapters';
import { nullAdapter, objectAdapter } from '@/adapters/common';
import { countriesReverseAdapter } from '@/adapters/country';
import { transformDate } from '@/utils/date';
import { getLocode, trimTonValue } from '@/utils/helpers';

export function requestSearchVesselAdapter({ data }) {
  if (data === null) return null;

  const {
    laycanStart,
    laycanEnd,
    cargoType,
    dischargeTerminal,
    loadTerminal,
    products,
    page,
    perPage,
    sortBy,
    rangeBy,
    savedSearchId,
    additionalDischargeOptions = {},
    sanctionedCountries = [],
    excludeInternationallySanctioned = false,
  } = data;

  return {
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    cargoTypeId: cargoType.value,
    laycanStart,
    laycanEnd,
    page,
    pageSize: perPage,
    sortColumn: rangeBy,
    sortColumnDirection: sortBy,
    cargoes: postProductsAdapter({ data: products }),
    savedSearchId,
    additionalDischargeOptions,
    sanctionedCountries: countriesReverseAdapter({ data: sanctionedCountries }),
    excludeInternationallySanctioned,
  };
}

export function responseSearchVesselsAdapter({ data }) {
  if (!data) return null;

  const processedData = data.map((result) => responseSearchVesselAdapter({ data: result }));

  return {
    exactResults: processedData.filter(({ searchResultFlag }) => searchResultFlag === 'Exactly'),
    partialResults: processedData.filter(({ searchResultFlag }) => searchResultFlag === 'Partially'),
  };
}

export function responseSearchVesselAdapter({ data }) {
  if (!data) return null;

  const {
    // name,
    // imo,
    id,
    flagOfRegistry,
    summerDeadWeight,
    estimatedArrivalTime,
    ballastLeg,
    ownerCompany: { yearsInOperation, numberOfTankers, estimatedAverageTankerDwt },
    vesselAge,
    cubicCapacity,
    segregationCount,
    loa,
    beam,
    typeOfHull,
    registeredOwnerCountry,
    disponentOwnerCountry,
    technicalOperatorCountry,
    commercialOperatorCountry,
    searchResultFlag,
    hasFailedOffer,
    cargoes,
  } = data;

  const processedCargoes = cargoes?.map((result) => responseSearchVesselCargoesAdapter({ data: result }));

  return {
    id,
    tankerName: 'Hidden name',
    imo: 'Hidden number',
    flagOfRegistry,
    dwt: summerDeadWeight,
    estimatedArrival: estimatedArrivalTime && transformDate(estimatedArrivalTime, 'MMM dd, yyyy'),
    ballastLeg,
    estimatedArrivalTime,
    expandedData: {
      vesselOwnerData: [
        {
          title: 'Years in Operation',
          description: yearsInOperation,
        },
        {
          title: 'Number of Tankers',
          description: numberOfTankers,
        },
        {
          title: 'Estimated average tanker DWT',
          description: estimatedAverageTankerDwt,
        },
      ],
      tankerData: [
        {
          title: 'Ship age',
          description: vesselAge,
        },
        {
          title: 'Cubic capacity 98%',
          description: `${trimTonValue(cubicCapacity)} m³`,
        },
        {
          title: 'Number of Segregations',
          description: segregationCount,
        },
        {
          title: 'LOA',
          description: loa,
        },
        {
          title: 'Beam',
          description: beam,
        },
        {
          title: 'Type of Hull',
          description: typeOfHull,
        },
      ],
      countryData: [
        {
          title: 'Country of Registered Owner',
          description: registeredOwnerCountry?.name,
          countryCode: registeredOwnerCountry?.codeISO2,
        },
        {
          title: 'Country of Disponent Owner',
          description: disponentOwnerCountry?.name,
          countryCode: disponentOwnerCountry?.codeISO2,
        },
        {
          title: 'Country of Technical Operator',
          description: technicalOperatorCountry?.name,
          countryCode: technicalOperatorCountry?.codeISO2,
        },
        {
          title: 'Country of Commercial Operator',
          description: commercialOperatorCountry?.name,
          countryCode: commercialOperatorCountry?.codeISO2,
        },
      ],
    },
    searchResultFlag,
    hasFailedOffer,
    products: processedCargoes,
  };
}

export function requestAddVesselToFleetAdapter({ data }) {
  if (!data) return null;

  const { tankerId } = data;

  return {
    vesselId: tankerId,
  };
}

export function responseSearchVesselCargoesAdapter({ data }) {
  if (!data) return null;

  const { product: responseProduct, quantity, tolerance, referenceDensity: density } = data;

  const product = {
    label: responseProduct?.name,
    value: responseProduct?.id,
  };

  return {
    product,
    density,
    quantity,
    tolerance,
  };
}

export function responseAddVesselByImoAdapter({ data }) {
  return nullAdapter(data);
}

export function requestAddVesselManuallyAdapter({ data }) {
  if (!data) return null;

  const {
    fleetId,
    tankerName,
    imo,
    updateDate,
    built,
    portOfRegistry,
    // country,
    tankerType,
    tankerCategoryOne,
    tankerCategoryTwo,
    hullType,
    loa,
    beam,
    summerDWT,
    summerDraft,
    normalBallastDWT,
    normalBallastDraft,
    cubicCapacity,
    imoClass,
    grades,
    registeredOwner,
    registeredOwnerCountry,
    technicalOperator,
    technicalOperatorCountry,
    commercialOperator,
    commercialOperatorCountry,
    disponentOwner,
    disponentOwnerCountry,
    file,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  } = data;

  return {
    name: tankerName,
    imo,
    imoClass: imoClass.value,
    updateDate,
    built,
    registryPortId: portOfRegistry.value,
    vesselTypeId: tankerType.value,
    vesselCategoryOneId: tankerCategoryOne.value,
    vesselCategoryTwoId: tankerCategoryTwo?.value,
    hullType: hullType.value,
    loa,
    beam,
    summerDwt: summerDWT,
    summerDraft,
    ballastDwt: normalBallastDWT,
    ballastDraft: normalBallastDraft,
    cubicCapacity,
    segregationCount: grades,
    registeredOwner,
    registeredOwnerCountryId: registeredOwnerCountry.value,
    technicalOperator,
    technicalOperatorCountryId: technicalOperatorCountry.value,
    commercialOperator,
    commercialOperatorCountryId: commercialOperatorCountry.value,
    disponentOwner,
    disponentOwnerCountryId: disponentOwnerCountry.value,
    fleetId,
    q88QuestionnaireFile: file,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  };
}
export function requestUpdateVesselAdapter({ data }) {
  if (!data) return null;

  const {
    tankerId,
    tankerName,
    imo,
    updateDate,
    built,
    portOfRegistry,
    country,
    tankerType,
    tankerCategoryOne,
    tankerCategoryTwo,
    hullType,
    loa,
    beam,
    summerDWT,
    summerDraft,
    normalBallastDWT,
    normalBallastDraft,
    cubicCapacity,
    imoClass,
    grades,
    registeredOwner,
    registeredOwnerCountry,
    technicalOperator,
    technicalOperatorCountry,
    commercialOperator,
    commercialOperatorCountry,
    disponentOwner,
    disponentOwnerCountry,
    file,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  } = data;

  return {
    vesselId: tankerId,
    name: tankerName,
    imo,
    imoClass: imoClass.value,
    updateDate,
    built,
    registryPortId: portOfRegistry.value,
    vesselTypeId: tankerType.value,
    vesselCategoryOneId: tankerCategoryOne.value,
    vesselCategoryTwoId: tankerCategoryTwo?.value,
    hullType: hullType.value,
    loa,
    beam,
    countryId: country?.value || null,
    summerDwt: summerDWT,
    summerDraft,
    ballastDwt: normalBallastDWT,
    ballastDraft: normalBallastDraft,
    cubicCapacity,
    segregationCount: grades,
    registeredOwner,
    registeredOwnerCountryId: registeredOwnerCountry.value,
    technicalOperator,
    technicalOperatorCountryId: technicalOperatorCountry.value,
    commercialOperator,
    commercialOperatorCountryId: commercialOperatorCountry.value,
    disponentOwner,
    disponentOwnerCountryId: disponentOwnerCountry.value,
    q88QuestionnaireFile: file,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  };
}

export function unassignedVesselsAdapter({ data }) {
  return objectAdapter(data);
}

export function responseAddVesselManuallyAdapter({ data }) {
  return nullAdapter(data);
}

export function responseGetVesselTypesAdapter({ data }) {
  return nullAdapter(data);
}
export function responseGetUnassignedVesselsAdapter({ data }) {
  if (!data) return null;

  return data.map((element) => unassignedVesselsAdapter({ data: element }));
}
export function responseGetVesselDetailsAdapter({ data }) {
  return nullAdapter(data);
}

export function responseGetVesselCategoryOneAdapter({ data }) {
  return nullAdapter(data);
}

export function responseGetVesselCategoryTwoAdapter({ data }) {
  return nullAdapter(data);
}

export function responseDeleteVesselFromFleetAdapter({ data }) {
  return nullAdapter(data);
}

export function responseDeleteVesselAdapter({ data }) {
  return nullAdapter(data);
}

export function responseGetVesselQ88Adapter({ data }) {
  if (!data) return null;

  const {
    ballastDraft,
    ballastDwt,
    beam,
    built,
    cubicCapacity,
    // flag,
    hullType,
    imo,
    imoClass,
    loa,
    name,
    // rawVesselType,
    registryPort,
    segregationCount,
    summerDraft,
    summerDwt,
    updateDate,
    vesselCategoryOne,
    vesselCategoryTwo,
    vesselTypeLevelOne,
    country,
    registeredOwner,
    registeredOwnerCountry,
    technicalOperator,
    technicalOperatorCountry,
    commercialOperator,
    commercialOperatorCountry,
    disponentOwner,
    disponentOwnerCountry,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  } = data;

  return {
    tankerName: name,
    imo,
    updateDate,
    built,
    portOfRegistry: registryPort && { label: registryPort, value: registryPort },
    country,
    tankerType: vesselTypeLevelOne && { label: vesselTypeLevelOne, value: vesselTypeLevelOne },
    tankerCategoryOne: vesselCategoryOne && { label: vesselCategoryOne, value: vesselCategoryOne },
    tankerCategoryTwo: vesselCategoryTwo && { label: vesselCategoryTwo, value: vesselCategoryTwo },
    hullType: hullType && { label: hullType, value: hullType },
    loa,
    beam,
    summerDWT: summerDwt,
    summerDraft,
    normalBallastDWT: ballastDwt,
    normalBallastDraft: ballastDraft,
    cubicCapacity,
    imoClass: imoClass && { label: imoClass, value: imoClass },
    grades: segregationCount,
    registeredOwner,
    registeredOwnerCountry,
    technicalOperator,
    technicalOperatorCountry,
    commercialOperator,
    commercialOperatorCountry,
    disponentOwner,
    disponentOwnerCountry,
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  };
}

export function userTankerAdapter({ data }) {
  if (!data) return {};

  const {
    vesselId,
    name,
    openPort,
    appearsInSearch,
    openDate,
    imo,
    id,
    details,
    expirationExtendedForFirstTime,
    expirationExtendedForSecondTime,
  } = data;

  return {
    id: vesselId ?? id,
    title: name ?? details?.name,
    date: openDate,
    port: openPort?.name,
    portId: openPort?.id,
    countryId: openPort?.countryId,
    countryCode: getLocode(openPort?.locode),
    status: appearsInSearch,
    rolled: expirationExtendedForFirstTime || expirationExtendedForSecondTime,
    imo,
    flagOfRegistry: getLocode(details?.flagOfRegistry?.codeISO2) || getLocode(details?.flagOfRegistry?.codeISO3),
  };
}

export function userTankersDetailsAdapter({ data }) {
  if (!data) return [];

  return data.map((tanker) => {
    return userTankerAdapter({ data: tanker });
  });
}

export function updateVesselPortAndDataAdapter({ data }) {
  if (!data) return {};

  const { id, portId, date, available } = data;

  return {
    id,
    portId,
    opendate: new Date(date).toISOString(),
    appearsInSearch: available,
  };
}

export function removeVesselFromFleetAdapter({ data }) {
  if (!data) return {};

  const { id } = data;

  return {
    vesselId: id,
  };
}

export function removeVesselAdapter({ data }) {
  if (!data) return {};

  const { id } = data;

  return {
    id,
  };
}

export function vesselDetailsAdapter({ data }) {
  if (!data) return {};

  const {
    details: {
      name,
      q88UpdateDate,
      built,
      vesselTypeId,
      vesselCategoryOneId,
      vesselCategoryTwoId,
      typeOfHull,
      loa,
      beam,
      summerDwt,
      summerDraft,
      ballastDwt,
      ballastDraft,
      cubicCapacity,
      imoClass,
      segregationCount,
      registeredOwner,
      registeredOwnerCountryId,
      technicalOperator,
      technicalOperatorCountryId,
      commercialOperator,
      commercialOperatorCountryId,
      disponentOwner,
      disponentOwnerCountryId,
      portOfRegistry,
      netTonnage,
      grossTonnage,
      suezCanalNetTonnage,
      suezCanalGrossTonnage,
      panamaCanalNetTonnage,
    } = {},
    imo,
  } = data;

  return {
    tankerName: name,
    imo,
    updateDate: q88UpdateDate,
    built,
    portOfRegistry: {
      label: portOfRegistry?.name,
      value: portOfRegistry?.id,
      countryFlag: getLocode(portOfRegistry?.locode),
    },
    tankerType: { label: '', value: vesselTypeId },
    tankerCategoryOne: { label: '', value: vesselCategoryOneId },
    tankerCategoryTwo: vesselCategoryTwoId && { label: '', value: vesselCategoryTwoId },
    hullType: { label: typeOfHull, value: typeOfHull },
    loa,
    beam,
    summerDWT: summerDwt,
    summerDraft,
    normalBallastDWT: ballastDwt,
    normalBallastDraft: ballastDraft,
    cubicCapacity,
    imoClass: { label: imoClass, value: imoClass },
    grades: segregationCount,
    registeredOwner,
    registeredOwnerCountry: { label: '', value: registeredOwnerCountryId },
    technicalOperator,
    technicalOperatorCountry: { label: '', value: technicalOperatorCountryId },
    commercialOperator,
    commercialOperatorCountry: { label: '', value: commercialOperatorCountryId },
    disponentOwner,
    disponentOwnerCountry: disponentOwnerCountryId && { label: '', value: disponentOwnerCountryId },
    netTonnage,
    grossTonnage,
    suezCanalNetTonnage,
    suezCanalGrossTonnage,
    panamaCanalNetTonnage,
  };
}

export const tankerInformationAdapter = (data) => {
  if (!data) return [];
  const {
    vessel: {
      company: { estimatedAverageTankerDWT, details: { numberOfVessels, yearsInOperation } } = {},
      details: {
        summerDwt,
        built,
        cubicCapacity,
        segregationCount,
        loa,
        beam,
        typeOfHull,
        flagOfRegistry,
        registeredOwnerCountry,
        disponentOwnerCountry,
        technicalOperatorCountry,
        commercialOperatorCountry,
      } = {},
    } = {},
    ballastLeg,
    estimatedArrivalTime,
  } = data;

  return {
    ownerInfo: [
      {
        title: 'Years of Operation',
        description: `${yearsInOperation} ${yearsInOperation > 1 ? 'years' : 'year'}`,
      },
      {
        title: 'Number of Tankers',
        description: `${numberOfVessels} ${numberOfVessels > 1 ? 'tankers' : 'tanker'}`,
      },
      {
        title: 'Estimated average tanker DWT',
        description: `${estimatedAverageTankerDWT} kt`,
      },
    ],
    tankerInfo: [
      {
        title: 'Tanker name',
        description: 'Hidden name',
      },
      {
        title: 'IMO',
        description: 'Hidden number',
      },
      {
        title: 'Flag / Country',
        description: flagOfRegistry?.name,
        countryCode: flagOfRegistry?.codeISO2,
      },
      {
        title: 'DWT',
        description: `${trimTonValue(summerDwt)} tons`,
      },
      {
        title: 'Estimated Arrival',
        description: transformDate(estimatedArrivalTime, 'MMM dd, yyyy'),
      },
      {
        title: 'Ballast Leg',
        description: ballastLeg,
      },
      {
        title: 'Ship Age',
        description: `≤ ${new Date().getFullYear() - built} years`,
      },
      {
        title: 'Cubic Capacity 98%',
        description: `${trimTonValue(cubicCapacity)} m³`,
      },
      {
        title: 'Number of Segregations',
        description: segregationCount,
      },
      {
        title: 'LOA',
        description: `${loa} m`,
      },
      {
        title: 'Beam',
        description: `${beam} m`,
      },
      {
        title: 'Type of Hull',
        description: typeOfHull,
      },
      {
        title: 'Country of Registered Owner',
        description: registeredOwnerCountry?.name,
        countryCode: registeredOwnerCountry?.codeISO2,
      },
      {
        title: 'Country of Disponent Owner',
        description: disponentOwnerCountry?.name,
        countryCode: disponentOwnerCountry?.codeISO2,
      },
      {
        title: 'Country of Technical Operator',
        description: technicalOperatorCountry?.name,
        countryCode: technicalOperatorCountry?.codeISO2,
      },
      {
        title: 'Country of Commercial Operator',
        description: commercialOperatorCountry?.name,
        countryCode: commercialOperatorCountry?.codeISO2,
      },
    ],
  };
};

export const chartererInformationAdapter = (data) => {
  if (!data) return [];

  const {
    charterer: {
      yearsInOperation,
      estimatedNumberOfChartersPerYear,
      averageTonnagePerCharter,
      registrationCity: { country: { name: registrationCountryName, codeISO2: registrationCountryCode } = {} } = {},
    } = {},
  } = data;

  return [
    {
      title: 'Years in Operation',
      description: `${yearsInOperation} ${yearsInOperation > 1 ? 'years' : 'year'}`,
    },
    {
      title: 'Estimated Number of Charters per Year',
      description: `${estimatedNumberOfChartersPerYear} ${
        estimatedNumberOfChartersPerYear > 1 ? 'charters' : 'charter'
      }`,
    },
    {
      title: 'Average Tonnage per Charter',
      description: `${averageTonnagePerCharter} kt`,
    },
    {
      title: 'Country of registration',
      description: registrationCountryName,
      countryCode: registrationCountryCode,
    },
  ];
};

export function responseAddSavedSearchAdapter({ data }) {
  return nullAdapter(data);
}

export function responseGetSavedSearchAdapter({ data }) {
  return nullAdapter(data);
}

export function responseVesselNamesAdapter({ data }) {
  return nullAdapter(data);
}

export function requestAddVesselAdapter({ data }) {
  if (!data) return null;

  const { imo, fleetId, q88QuestionnaireFile } = data;

  return {
    imo,
    fleetId,
    q88QuestionnaireFile,
  };
}

export function responseAddVesselAdapter({ data }) {
  return nullAdapter(data);
}

export function vesselTankerLinkRequestAdapter(data) {
  if (!data) return null;

  const { vesselTypeId, vesselCategoryOneId, vesselCategoryTwoId } = data;

  return {
    vesselTypeId,
    vesselCategoryOneId,
    vesselCategoryTwoId,
  };
}

export function vesselTankerLinkResponseAdapter({ data }) {
  return nullAdapter(data);
}
