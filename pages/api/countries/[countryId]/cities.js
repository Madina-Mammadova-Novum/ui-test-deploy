import { citiesAdapter } from '@/adapters/city';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const { countryId } = req.query;
    const response = await getHandler(`v1/countries/${countryId}/cities`, 'backend');
    const responseData = citiesAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
