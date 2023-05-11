import { entityDataResponseAdapter } from '@/adapters/entityData';
import { getStrapiURL } from '@/utils';
import { responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  const { type, id } = req.query;
  return responseHandler({
    req,
    res,
    path: getStrapiURL(`/${type}/${id}?populate=*,coverImage,socialLinks.coverImage`),
    dataAdapter: entityDataResponseAdapter,
    requestMethod: 'GET',
  });
}
