import { getHandler } from '@/utils/api';

export default function handler(req, res) {
  return getHandler('countries', 'backend', req, res);
}
