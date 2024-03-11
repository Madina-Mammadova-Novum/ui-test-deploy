import { estimationBodyAdataper } from '@/adapters';
import { postData } from '@/utils/dataFetching';

export const getEstimation = async ({ data }) => {
  const body = estimationBodyAdataper({ data });

  const response = await postData(`tools/estimation?format=${data.calculator.value}`, body);

  return {
    ...response,
  };
};

export const getTransitionalCoordinates = async () => {
  const body = [
    {
      StartLon: 0,
      StartLat: 0,
      StartPortCode: 'RUNVS',
      EndLon: 0,
      EndLat: 0,
      EndPortCode: 'BGBOJ',
      GreatCircleInterval: 0,
      AllowedAreas: [2, 5, 7, 14, 10003],
      SecaAvoidance: 0,
      AslCompliance: 0,
    },
  ];

  const response = await postData(`tools/get-transitional-coordinates`, body);
  return response;
};
