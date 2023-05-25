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
