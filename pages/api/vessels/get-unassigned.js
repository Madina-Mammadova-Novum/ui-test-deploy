import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    return res.status(200).json({
      data: {
        numberOfVessels: 3,
        vessels: [
          {
            id: 1,
            tankerName: 'Tanker name 1',
            imo: 1234567,
            dwt: 543,
            tankerCategory: 'Dpp',
            q88Questionaire: 'something',
            tankerStatus: 'Active',
          },
          {
            id: 2,
            tankerName: 'Tanker name 2',
            imo: 1234568,
            dwt: 666,
            tankerCategory: 'Dpp',
            q88Questionaire: 'something',
            tankerStatus: 'Inactive',
          },
          {
            id: 3,
            tankerName: 'Tanker name 3',
            imo: 1234569,
            dwt: 777,
            tankerCategory: 'Dpp',
            q88Questionaire: 'something',
            tankerStatus: 'Active',
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
