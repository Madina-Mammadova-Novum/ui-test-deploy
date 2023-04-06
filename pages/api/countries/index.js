import { getHandler } from '@/utils/api';

export default function handler(req, res) {
  return getHandler('v1/countries', 'backend', req, res);
}
