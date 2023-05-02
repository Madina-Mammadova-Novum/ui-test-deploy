import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { portId } = req.query;
  return getHandler(`v1/ports/${portId}/terminals`, 'backend', req, res);
}
