import { entityDataResponseAdapter } from '@/adapters/entityData';
import { ROOT_COLLECTION_TYPE, ROOT_SLUG } from '@/lib/constants';
import { getEndpoint } from '@/services/collectionType';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { s: slug, l: locale, c: collectionType, p: preview } = req.query;
  const endpoint = getEndpoint(
    slug || ROOT_SLUG,
    locale || 'en',
    collectionType || ROOT_COLLECTION_TYPE,
    preview || false
  );

  return responseHandler({
    req,
    res,
    path: getStrapiURL(endpoint),
    dataAdapter: entityDataResponseAdapter,
    requestMethod: 'GET',
  });
}
