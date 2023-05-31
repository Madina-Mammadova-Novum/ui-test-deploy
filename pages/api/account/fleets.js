import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    return res.status(200).json({
      data: [
        {
          id: 8,
          type: 'ascending',
          fleetName: 'Fleet Base West',
          numberOfTankers: 11,
          tankers: [
            {
              id: 1,
              name: 'Barcelona, ESBCN',
              imo: '9581291',
              dwt: '23,600 tons',
              category: 'LNG Carrier',
              questionaire: true,
              status: 'Active',
            },
            {
              id: 1,
              name: 'Barcelona, ESBCN',
              imo: '9581291',
              dwt: '23,600 tons',
              category: 'LNG Carrier',
              questionaire: false,
              status: 'Active',
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
