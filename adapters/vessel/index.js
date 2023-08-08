import { postProductsAdapter } from '@/adapters';
import { transformDate } from '@/utils/date';

export function requestSearchVesselAdapter({ data }) {
  if (data === null) return null;
  const {
    laycanStart,
    laycanEnd,
    cargoType,
    dischargeTerminal,
    loadTerminal,
    products,
    // dischargePort,
    // loadPort
  } = data;

  return {
    loadTerminalId: loadTerminal.value,
    dischargeTerminalId: dischargeTerminal.value,
    cargoTypeId: cargoType.value,
    laycanStart,
    laycanEnd,
    cargoes: postProductsAdapter({ data: products }),
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
    flag,
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
  } = data;

  return {
    id,
    tankerName: 'Hidden name',
    imo: 'Hidden number',
    flag,
    dwt: summerDeadWeight,
    estimatedArrival: estimatedArrivalTime && transformDate(estimatedArrivalTime, 'MMM dd, yyyy'),
    ballastLeg,
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
          description: cubicCapacity,
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
          description: registeredOwnerCountry,
        },
        {
          title: 'Country of Disponent Owner',
          description: disponentOwnerCountry,
        },
        {
          title: 'Country of Technical Operator',
          description: technicalOperatorCountry,
        },
        {
          title: 'Country of Commercial Operator',
          description: commercialOperatorCountry,
        },
      ],
    },
    searchResultFlag,
  };
}

export function requestAddVesselToFleetAdapter({ data }) {
  if (!data) return null;

  const { tankerId } = data;

  return {
    vesselId: tankerId,
  };
}

export function responseAddVesselByImoAdapter({ data }) {
  if (!data) return null;

  return data;
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
  } = data;

  return {
    name: tankerName,
    imo,
    imoClass: imoClass.value,
    updateDate,
    built,
    registryPortId: portOfRegistry.value,
    vesselTypeId: tankerType.value,
    vesselCategoyOneId: tankerCategoryOne.value,
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
  };
}

export function responseAddVesselManuallyAdapter({ data }) {
  if (!data) return null;

  return data;
}

export function responseGetVesselTypesAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseGetUnassignedVesselsAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseGetVesselDetailsAdapter({ data }) {
  if (!data) return null;

  return data;
}

export function responseGetVesselCategoryOneAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseGetVesselCategoryTwoAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseGetVesselFreightFormatsAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseDeleteVesselFromFleetAdapter({ data }) {
  if (!data) return null;

  return data;
}
export function responseDeleteVesselAdapter({ data }) {
  if (!data) return null;

  return data;
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
  };
}

export function userTankerAdapter({ data }) {
  if (!data) return {};

  const { vesselId, name, openPort, appearsInSearch, openDate, imo } = data;

  return {
    id: vesselId,
    title: name,
    date: openDate,
    port: openPort?.name,
    portId: openPort?.id,
    countryId: openPort?.countryId,
    status: appearsInSearch,
    imo,
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
