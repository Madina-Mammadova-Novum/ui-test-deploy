import { requestFreightEstimationAdapter } from '@/adapters/calculator';
import { postData } from '@/utils/dataFetching';

export async function calculateFreightEstimation({ data }) {
  const body = requestFreightEstimationAdapter({ data });
  const response = await postData(`calculator/freight-estimation`, body);
  return {
    ...response,
  };
}
