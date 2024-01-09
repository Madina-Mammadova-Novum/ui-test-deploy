import { singleTypeAdapter } from '@/adapters/singleType';
import { getSingleTypeEndpoint } from '@/services/singleType';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { s: slug, l: locale } = req.query;
  const endpoint = getSingleTypeEndpoint(slug, locale || 'en');

  return responseHandler({
    req,
    res,
    path: getStrapiURL(endpoint),
    dataAdapter: singleTypeAdapter,
    requestMethod: 'GET',
  });
}
