function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req, res) {
  await sleep(2000);
  res.status(200).json({
    data: [
      {
        id: 1,
        type: 'ascending',
        cargoId: 'TY7621',
        cargoType: 'Gas (Liquified)',
        quantity: '24,118 tons',
        loadPort: 'Barcelona, ESBCN',
        laycanStart: 'Dec 21, 2021',
        laycanEnd: 'Dec 30, 2021',
        creationDate: 'Jan 2, 2022',
        countdown: '15min',
        tankersInfo: [
          {
            id: 1,
            dockId: 'XP1234-003',
            title: 'Q88 questionnaire',
            comment: '',
            docName: 'Document',
            extension: '.doc',
            size: '102.56 MB',
            dateAdded: new Date(),
          },
        ],
      },
    ],
  });
}
