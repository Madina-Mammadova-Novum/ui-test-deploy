import { postHandler } from '@/utils/api';

export default function handler(req, res) {
  return postHandler('charterer/company/create', req, res);
}
