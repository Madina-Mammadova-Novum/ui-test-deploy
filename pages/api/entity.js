import { getEndpoint } from '@/services/page';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { s: slug, l: locale, c: collectionType, p: preview } = req.query;
  const endpoint = getEndpoint(slug, locale, collectionType, preview);
  return getHandler(endpoint, 'strapi', req, res);
}
