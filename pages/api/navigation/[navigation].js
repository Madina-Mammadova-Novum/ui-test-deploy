import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { navigation, l: locale } = req.query;
  return getHandler(`/navigation/render/${navigation}?type=TREE&locale=${locale}`, 'strapi', req, res);
}
