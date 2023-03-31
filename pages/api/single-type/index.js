import { getSingleTypeEndpoint } from '@/services/singleType';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { s: slug, l: locale } = req.query;
  const endpoint = getSingleTypeEndpoint(slug, locale);
  return getHandler(endpoint, 'strapi', req, res);
}
