import { estimationBodyAdapter } from '@/adapters';
import { postData } from '@/utils/dataFetching';

export const getEstimation = async ({ data }) => {
  const body = estimationBodyAdapter({ data });

  const response = await postData(`tools/estimation?format=${data.calculator.value}`, body);

  return {
    ...response,
  };
};
