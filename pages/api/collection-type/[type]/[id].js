import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type, id } = req.query;
  return getHandler(`/${type}/${id}?populate=*,coverImage,socialLinks.coverImage`, 'strapi', req, res);
}
