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
        id: 8,
        type: 'ascending',
        tankerName: 'Harvey Deep Sea',
        imo: '9131034',
        fleetName: 'Fleet Base West',
        openDate: 'Dec 21, 2021',
        openPort: 'Botas Natural Gas Terminal, ESBCN',
        incomingOffers: [
          {
            id: 1,
            incomingOfferCargoId: 'QW1122',
            laycanStart: 'Dec 18, 2021',
            laycanEnd: 'Dec 19, 2021',
            loadPort: 'Barcelona, ESBCN',
            status: 'New offer',
            dateReceived: 'Dec 19, 2021',
            countdown: '1d 1h 50m',
          },
        ],
        sentCounteroffers: [
          {
            id: 1,
            sentOfferCargoId: 'QW1122',
            laycanStart: 'Dec 18, 2021',
            laycanEnd: 'Dec 19, 2021',
            loadPort: 'Barcelona, ESBCN',
            dateSent: 'Dec 19, 2021',
            countdown: '1d 1h 50m',
          },
        ],
        failedOffers: [
          {
            id: 1,
            failedOfferCargoId: 'QW1122',
            laycanStart: 'Dec 18, 2021',
            laycanEnd: 'Dec 19, 2021',
            loadPort: 'Barcelona, ESBCN',
            dateFailed: 'Dec 19, 2021',
            reason: 'Offer timed out',
          },
        ],
      },
    ],
  });
}
