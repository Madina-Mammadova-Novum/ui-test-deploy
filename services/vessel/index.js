import { searchVesselAdapter } from '@/adapters/vessel';
import { postData } from '@/utils/dataFetching';
import { searchRowHeaders } from '@/utils/mock';

export async function searchVessels({ data }) {
  const body = searchVesselAdapter({ data });

  const response = await postData(`vessels/search`, body);

  // FOR_TESTING_PURPOSES | Remove once backend has data
  if (!response?.data?.length) {
    response.data = searchRowHeaders;
  }
  /// ///////////

  return response;
}
