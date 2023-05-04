import { postHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type } = req.query;
  return postHandler(`v1/${type}/company/create`, req, res);
  // TODO: postHandler for signup doesn't return actual backend status
}
