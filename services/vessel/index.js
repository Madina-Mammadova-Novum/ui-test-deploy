import { searchVesselAdapter } from '@/adapters/vessel';
import { postData } from '@/utils/dataFetching';

export async function searchVessels({ data }) {
  const body = searchVesselAdapter({ data });
  const response = await postData(`vessels/search`, JSON.stringify(body));
  return response;
}
