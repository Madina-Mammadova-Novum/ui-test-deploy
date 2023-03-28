import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { valueId } = req.query;
  return getHandler(`/values/${valueId}?populate=*`, 'strapi', req, res);
}
