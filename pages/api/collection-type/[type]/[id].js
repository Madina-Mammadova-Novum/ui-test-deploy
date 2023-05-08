import { entityDataResponseAdapter } from '@/adapters/entityData';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type, id, locale, preview } = req.query;
  try {
    const response = await getHandler(`/${type}/${id}?populate=*,coverImage,socialLinks.coverImage`, 'strapi');
    // todo: need to do without entityDataResponseAdapter
    const responseData = await entityDataResponseAdapter(response, locale || 'en', type, preview || false);
    if (!responseData) return res.status(404).json({ error: { message: `Not Found`, errors: [], status: 404 } });
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: `${type} collection type - Internal server error` } });
  }
}
