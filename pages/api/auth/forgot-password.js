import { postHandler } from '@/utils/api';

export default async function handler(req, res) {
  return postHandler(`auth/forgotpassword`, req, res);
}
