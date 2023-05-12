import { entitiesDataResponseAdapter } from '@/adapters/entityData';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type } = req.query;
  return responseHandler({
    req,
    res,
    path: getStrapiURL(`/${type}?populate=deep`),
    dataAdapter: entitiesDataResponseAdapter, // todo: the need to dynamically connect an adapter for each type of collection
    requestMethod: 'GET',
  });
}
