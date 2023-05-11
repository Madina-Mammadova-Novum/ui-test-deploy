import { userDetailsAdapter } from '@/adapters/user';
import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    const data = {
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
    };
    return res.status(200).json(userDetailsAdapter(data));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
