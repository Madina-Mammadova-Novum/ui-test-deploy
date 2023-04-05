import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type } = req.query;
  return getHandler(`/${type}?populate=*`, 'strapi', req, res);
}
