import delve from 'dlv';

import { getEntityData } from '@/services';

export const getHomePageData = async ({ params }) => {
  const data = await getEntityData(params);

  const pageData = delve(data, 'data');
  const blocks = delve(pageData, 'blocks');
  const content = delve(pageData, 'content');

  return Promise.resolve({ blocks, content, pageData });
};
