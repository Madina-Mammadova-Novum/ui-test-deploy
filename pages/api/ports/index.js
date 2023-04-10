import { getHandler } from '@/utils/api';

export default function handler(req, res) {
  return getHandler('v1/ports/registryports', 'backend', req, res);
}
