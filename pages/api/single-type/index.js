import { singleTypeAdapter } from '@/adapters/singleType';
import { getSingleTypeEndpoint } from '@/services/singleType';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const { s: slug, l: locale } = req.query;
    const endpoint = getSingleTypeEndpoint(slug, locale || 'en');
    const response = await getHandler(endpoint, 'strapi');
    const responseData = singleTypeAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Single type - Internal server error' } });
  }
}
