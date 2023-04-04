function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req, res) {
  await sleep(2000);
  res.status(200).json({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john_doe@shp.link',
      primaryPhone: '+ 1 232-456-1232',
      secondaryPhone: '+ 1 232-456-1232',
      companyName: 'Ship.link',
      yearsInOperation: '5',
      numberOfTankers: '5',
      currentPassword: 'test123A!',
      registrAddress: {
        primaryLine: 'Ship.link',
        secondaryLine: '',
        city: 'Baku',
        state: '',
        zip: 'AZ 1110',
        country: 'Azerbaijan',
      },
      correspondAddress: {
        primaryLine: 'Ship.link',
        secondaryLine: '',
        city: 'Baku',
        state: '',
        zip: 'AZ 1110',
        country: 'Azerbaijan',
      },
    },
  });
}
