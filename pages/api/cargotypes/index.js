import { cargoTypesAdapter } from '@/adapters/cargoTypes';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const response = await getHandler(`v1/cargotypes`, 'backend');
    const responseData = cargoTypesAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
