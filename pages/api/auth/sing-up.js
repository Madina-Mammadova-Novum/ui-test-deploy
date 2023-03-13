import { postHandler } from '@/utils/api';

export default function handler(req, res) {
  return postHandler('owner/company/create', req, res);
}
