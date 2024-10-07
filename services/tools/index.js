import { estimationBodyAdapter } from '@/adapters';
import { postData } from '@/utils/dataFetching';

export const getEstimation = async ({ data }) => {
  const body = estimationBodyAdapter({ data });

  const response = await postData(`tools/estimation?format=${data.calculator.value}`, body);

  return {
    ...response,
  };
};

export const getTransitionalCoordinates = async ({ StartPortCode = '', EndPortCode = '' }) => {
  const body = [
    {
      StartLon: 0,
      StartLat: 0,
      StartPortCode,
      EndLon: 0,
      EndLat: 0,
      EndPortCode,
      GreatCircleInterval: 0,
      AllowedAreas: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 10004],
      SecaAvoidance: 0,
      AslCompliance: 0,
    },
  ];

  const response = await postData(`tools/get-transitional-coordinates`, body);
  return response;
};
