import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { cargoTypeId } = req.query;
  return getHandler(`v1/cargotypes/${cargoTypeId}/products`, 'backend', req, res);
}
