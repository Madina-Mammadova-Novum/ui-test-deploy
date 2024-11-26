import axios from 'axios';

import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);
  const { offerId } = req.query;

  try {
    const response = await axios({
      method: 'GET',
      url: getApiURL(`v1/${role}/deals/onsubs/${offerId}/recap`),
      headers: {
        ...Authorization(token),
        Accept: 'application/pdf',
      },
      responseType: 'arraybuffer',
    });

    // Set PDF response headers with suggested filename
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="offer_recap_${offerId}.pdf"`);

    // Send the PDF data
    return res.send(response.data);
  } catch (error) {
    console.error('PDF fetch error:', error);
    return res.status(error.response?.status || 500).json({
      error: 'Failed to fetch PDF',
    });
  }
}
