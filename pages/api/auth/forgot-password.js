import { bodyObject, postHandler } from '@/utils/api';

export default async function handler(req, res) {
  try {
    const { email } = bodyObject(req);
    if (!email) {
      return res.status(422).json({ error: { message: 'Please provide the required fields email' } });
    }
    const response = await postHandler(`auth/forgotpassword`, req.body, 'backend');
    if (response.status === 500) {
      const { error } = response;
      error.message = 'External server error';
      return res.status(response.status).json({ error });
    }
    // todo: add data adapter for response
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
