import { entityDataResponseAdapter } from '@/adapters/entityData';
import { ROOT_COLLECTION_TYPE, ROOT_SLUG } from '@/lib/constants';
import { getEndpoint } from '@/services/collectionType';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { s: slug, l: locale, c: collectionType, p: preview } = req.query;
  try {
    const endpoint = getEndpoint(
      slug || ROOT_SLUG,
      locale || 'en',
      collectionType || ROOT_COLLECTION_TYPE,
      preview || false
    );
    const response = await getHandler(endpoint, 'strapi');
    const responseData = await entityDataResponseAdapter(response, locale, collectionType, preview);
    if (!responseData) return res.status(404).json({ error: { message: `Not Found`, errors: [], status: 404 } });
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: `${collectionType} collection type - Internal server error` } });
  }
}
