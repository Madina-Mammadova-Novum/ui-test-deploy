import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    return res.status(200).json({
      data: [
        {
          id: 8,
          type: 'ascending',
          cargoId: 'TY7621',
          tankerName: 'Harvey Deep Sea',
          cargoType: 'Gas (Liquified)',
          quantiity: '24,118 tons',
          loadPort: 'Botas Natural Gas T... ESBCN',
          laycanStart: 'Dec 21, 2021',
          laycanEnd: 'Dec 30, 2021',
          countdown: '4h',
        },
        {
          id: 8,
          type: 'ascending',
          cargoId: 'TY7777',
          tankerName: 'Harvey Deep Sea',
          cargoType: 'Gas (Liquified)',
          quantiity: '24,118 tons',
          loadPort: 'Botas Natural Gas T... ESBCN',
          laycanStart: 'Dec 21, 2021',
          laycanEnd: 'Dec 30, 2021',
          countdown: '4h',
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
