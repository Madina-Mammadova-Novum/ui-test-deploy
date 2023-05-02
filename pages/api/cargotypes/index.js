import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  return getHandler(`v1/cargotypes`, 'backend', req, res);
}
