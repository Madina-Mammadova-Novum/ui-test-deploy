import { entityDataResponseAdapter } from '@/adapters/entityData';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type, id } = req.query;
  return responseHandler({
    req,
    res,
    path: getStrapiURL(`/${type}/${id}?populate=deep`),
    dataAdapter: entityDataResponseAdapter, // todo: the need to dynamically connect an adapter for each type of collection
    requestMethod: 'GET',
  });
}
