import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  // todo: PUT request here
  try {
    return res.status(200).json({
      message: 'Your request has been sent for review',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
