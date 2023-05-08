import { navigationAdapter } from '@/adapters/navigation';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { navigation, l: locale } = req.query;
  try {
    const response = await getHandler(`/navigation/render/${navigation}?type=TREE&locale=${locale}`, 'strapi');
    const responseData = navigationAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: `${navigation} navigation - Internal server error` } });
  }
}
