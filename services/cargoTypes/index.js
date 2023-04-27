import { cargoTypesAdapter } from '@/adapters/cargoTypes';
import { getData } from '@/utils/dataFetching';

export const getCargoTypes = async () => {
  const response = await getData(`cargotypes`);
  return cargoTypesAdapter(response);
};
