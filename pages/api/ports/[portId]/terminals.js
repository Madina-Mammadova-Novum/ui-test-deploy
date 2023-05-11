import { terminalsAdapter } from '@/adapters/terminal';
import { getHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const { portId } = req.query;
    const response = await getHandler(`v1/ports/${portId}/terminals`, 'backend');
    const responseData = terminalsAdapter(response);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
