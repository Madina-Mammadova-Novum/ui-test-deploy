import { arrayAdapter } from '@/adapters/common';
import { countryAdapter } from '@/adapters/country';
import { terminalsAdapter } from '@/adapters/terminal';

export const portAdapter = ({ data }) => {
  if (!data) return [];

  const {
    id,
    name,
    locode,
    longitude,
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
      longitude,
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

export const portOptionsAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((port) => ({ value: port?.id, label: port.label, countryFlag: port?.countryFlag }));
};

export const dischargeOptionsAdapter = ({ data }) => {
  return arrayAdapter(data);
};
