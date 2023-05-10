import delve from 'dlv';

import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type } = req.query;
  try {
    const response = await getHandler(`/${type}?populate=*`, 'strapi');
    const data = delve(response, 'data');
    if (!data) return res.status(404).json({ error: { message: `Not Found`, errors: [], status: 404 } });
    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: `${type} collection type - Internal server error` } });
  }
}
