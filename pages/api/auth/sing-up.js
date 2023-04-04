import { postHandler } from '@/utils/api';

export default function handler(req, res) {
  const { type } = req.query;
  return postHandler(`${type}/company/create`, req, res);
}
