import { getPorts } from '../port';

import { portOptionsAdapter } from '@/adapters';
import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { getData } from '@/utils/dataFetching';

export const getCountries = async () => {
  const response = await getData(`countries`);

  return {
    ...response,
  };
};

export const getSignUpData = async () => {
  const countries = await getCountries();
  const ports = await getPorts({ query: '', pageSize: 20 });

  return {
    countries: dropDownOptionsAdapter({ data: countries?.data }),
    ports: portOptionsAdapter({ data: ports?.data }),
  };
};
