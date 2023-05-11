import { countryAdapter } from '@/adapters/country';
import { terminalsAdapter } from '@/adapters/terminal';

export const portAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];
  const {
    id,
    name,
    locode,
    longtitude,
    latitude,
    isRegistryPort,
    appearsInSearch,
    isConnectionPort,
    enabled,
    basinId,
    // countryId,
    country: countryData,
    terminals,
  } = data;

  const country = countryAdapter({ data: countryData });

  return {
    id,
    name,
    code: locode,
    coordinates: {
      longtitude,
      latitude,
    },
    options: {
      isRegistryPort,
      isConnectionPort,
      appearsInSearch,
      enabled,
    },
    basinId,
    country,
    terminals: terminalsAdapter({ data: terminals }),
    label: `${name}${locode ? `, ${locode}` : ``}`,
    countryFlag: country?.countryCode || null,
  };
};

export const portsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((port) => {
    return portAdapter({ data: port });
  });
};
