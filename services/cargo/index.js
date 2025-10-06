import { getData } from '@/utils/dataFetching';

export async function getCargoCodes({ stages = null }) {
  const response = await getData(`account/get-cargocodes${stages ? `?stages=${stages}` : ''}`);

  return {
    ...response,
  };
}
