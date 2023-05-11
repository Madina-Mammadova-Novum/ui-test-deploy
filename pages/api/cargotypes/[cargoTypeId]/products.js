import { getProductsAdapter } from '@/adapters';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const { cargoTypeId } = req.query;
    const response = await getHandler(`v1/cargotypes/${cargoTypeId}/products`, 'backend', req, res);
    const responseData = getProductsAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
