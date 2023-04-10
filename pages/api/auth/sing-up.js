import { postHandler } from '@/utils/api';

export default function handler(req, res) {
  const { type } = req.query;
  return postHandler(`v1/${type}/company/create`, req, res);
}
