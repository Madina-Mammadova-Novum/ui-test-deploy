import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    return res.status(200).json({
      data: [
        {
          id: 1,
          type: 'ascending',
          cargoId: 'TY7621',
          tankerName: 'Harvey Deep Sea',
          cargoType: 'Gas (Liquified)',
          quantity: '24,118 tons',
          loadPort: 'Botas Natural Gas T... ESBCN',
          laycanStart: 'Dec 21, 2021',
          laycanEnd: 'Dec 30, 2021',
          fixtureDate: 'Jan 2, 2022',
          documentsInfo: [
            {
              id: 1,
              docId: 'XP1234-003',
              title: 'Q88 questionnaire',
              comment: 'Some comment',
              docName: 'Document',
              extension: '.doc',
              size: '102.56 MB',
              dateAdded: new Date(),
              status: 'File delete requested',
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
