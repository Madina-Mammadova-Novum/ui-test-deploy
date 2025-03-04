import { charterPartyPreviewAdapter } from '@/adapters/charterParty';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

/**
 * @service CharterPartyPreview
 * @description Retrieves a preview URL for a charter party document
 * @endpoint /api/base-cp-templates/preview
 * @method POST
 * @business Allows users to preview the charter party document
 */
export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const role = getCookieFromServer('session-user-role', req);
  const { dealId } = req.body;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/deals/${dealId}/charterpartypreview`),
    dataAdapter: charterPartyPreviewAdapter,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
  });
}
