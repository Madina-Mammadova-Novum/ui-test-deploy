import { getServerSession } from 'next-auth';

import { responseGetFleetsAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/all`),
    dataAdapter: responseGetFleetsAdapter,
    requestMethod: 'POST',
    options: { ...Authorization(session?.accessToken) },
  });
  // await sleep(2000);
  // try {
  //   return res.status(200).json({
  //     data: [
  //       {
  //         id: 8,
  //         type: 'ascending',
  //         fleetName: 'Fleet Base West',
  //         numberOfTankers: 11,
  //         tankers: [
  //           {
  //             id: 1,
  //             name: 'Barcelona, ESBCN',
  //             imo: '9581291',
  //             dwt: '23,600 tons',
  //             category: 'LNG Carrier',
  //             questionaire: true,
  //             status: 'Active',
  //           },
  //           {
  //             id: 1,
  //             name: 'Barcelona, ESBCN',
  //             imo: '9581291',
  //             dwt: '23,600 tons',
  //             category: 'LNG Carrier',
  //             questionaire: false,
  //             status: 'Active',
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: { message: 'Internal server error' } });
  // }
}
