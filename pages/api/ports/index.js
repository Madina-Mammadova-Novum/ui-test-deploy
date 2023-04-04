import { getHandler } from '@/utils/api';

export default function handler(req, res) {
  return getHandler('ports/registryports', 'backend', req, res);
}
