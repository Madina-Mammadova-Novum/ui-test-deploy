import { navigationAdapter } from '@/adapters/navigation';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  const { navigation, l: locale } = req.query;
  return responseHandler({
    req,
    res,
    path: getStrapiURL(`/navigation/render/${navigation}?type=TREE&locale=${locale}`),
    dataAdapter: navigationAdapter,
    requestMethod: 'GET',
  });
}
