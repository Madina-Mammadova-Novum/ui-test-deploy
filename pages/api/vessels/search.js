import { postHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const response = await postHandler(`v1/vessels/search`, 'backend');
    // todo: don't see service for this endpoint
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
