import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { countryId } = req.query;
  return getHandler(`v1/countries/${countryId}/cities`, 'backend', req, res);
}
