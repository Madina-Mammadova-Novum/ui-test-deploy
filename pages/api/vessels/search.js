import { postHandler } from '@/utils/api';

export default async function handler(req, res) {
  return postHandler(`v1/vessels/search`, 'backend', req, res);
}
