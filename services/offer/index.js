import { getCargoCounteroffers, getCargoFailedOffers, getCargoSentOffers } from '../cargo';

import { requestAcceptPrefixtureAdapter } from '@/adapters';
import {
  acceptOfferAdapter,
  declineOfferAdapter,
  requestExtendCountdownAdapter,
  requestOnSubsCountdownExtensionAdapter,
  sendCounterofferAdapter,
  sendOfferAdapter,
  sendOfferValidationAdapter,
} from '@/adapters/offer';
import { ROLES } from '@/lib';
import { getData, postData } from '@/utils/dataFetching';
import { getRoleIdentity } from '@/utils/helpers';

export async function sendOfferValidation({ data }) {
  const body = sendOfferValidationAdapter({ data });
  const response = await postData(`offer/charterer/validation`, body);

  return { ...response };
}

export async function sendOffer({ data }) {
  const body = sendOfferAdapter({ data });

  const response = await postData(`offer/send`, body);

  if (response.status === 200) response.message = 'You have successfully submitted your offer';

  return {
    ...response,
  };
}

export async function declineOffer({ data, role }) {
  const body = declineOfferAdapter({ data });
  const path = role === ROLES.OWNER ? 'offer/decline' : 'offer/charterer/decline';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully submitted a decline';
  return {
    ...response,
  };
}

export async function acceptOffer({ data, role }) {
  const body = acceptOfferAdapter({ data });

  const path = role === ROLES.OWNER ? 'offer/accept' : 'offer/charterer/accept';

  const response = await postData(path, body);

  if (!response.error) response.message = 'You have successfully accepted the offer';

  return {
    ...response,
  };
}

export async function sendCounteroffer({ data, role }) {
  const body = sendCounterofferAdapter({ data });
  const path = role === ROLES.OWNER ? 'counteroffer/send' : 'counteroffer/charterer/send';
  const response = await postData(path, body);

  if (!response.error) response.message = 'You have successfully sent a counteroffer';

  return {
    ...response,
  };
}

export async function getIncomingOffers(tankerId) {
  const response = await getData(`vessels/incoming-offers/${tankerId}`);
  return {
    ...response,
  };
}

export async function getFailedOffers(tankerId) {
  const response = await getData(`vessels/failed-offers/${tankerId}`);
  return {
    ...response,
  };
}

export async function getSentCounteroffers(tankerId) {
  const response = await getData(`vessels/sent-counteroffers/${tankerId}`);
  return {
    ...response,
  };
}

export async function getOwnerDetailsOffers({ id }) {
  const incomingOffersData = await getIncomingOffers(id);
  const sentCounterOffersData = await getSentCounteroffers(id);
  const failedOffersData = await getFailedOffers(id);

  return {
    [id]: {
      incoming: incomingOffersData?.data,
      sent: sentCounterOffersData?.data,
      failed: failedOffersData?.data,
    },
  };
}

export async function getChartererDetailsOffers({ id }) {
  const sentOffersData = await getCargoSentOffers(id);
  const counteroffersData = await getCargoCounteroffers(id);
  const failedOffersData = await getCargoFailedOffers(id);

  return {
    [id]: {
      incoming: sentOffersData?.data,
      sent: counteroffersData?.data,
      failed: failedOffersData?.data,
    },
  };
}

export function* getOffersById({ data, role }) {
  const { isOwner } = getRoleIdentity({ role });

  const fetchOfferDetailsById = isOwner ? getOwnerDetailsOffers : getChartererDetailsOffers;

  return yield Promise.all(data.map(fetchOfferDetailsById));
}

export async function getOfferDetails(offerId, role) {
  const { isOwner } = getRoleIdentity({ role });

  const path = isOwner ? `offer/details/${offerId}` : `offer/charterer/details/${offerId}`;

  const response = await getData(path);

  return {
    ...response,
  };
}
export async function acceptPrefixtureOffer(offerId) {
  const body = requestAcceptPrefixtureAdapter({ data: offerId });

  const response = await postData(`account/pre-fixture/accept`, body);

  if (!response.error) response.message = 'You have confirmed to go on subs';

  return {
    ...response,
  };
}

export async function extendCountdown({ offerId, role }) {
  const body = requestExtendCountdownAdapter({ data: offerId });
  const { isOwner } = getRoleIdentity({ role });
  const path = isOwner ? `offer/extend-countdown` : `offer/charterer/extend-countdown`;
  const response = await postData(path, body);
  if (!response.error) response.message = 'Countdown has been successfully extended';
  return {
    ...response,
  };
}

export async function requestCountdownExtension({ data }) {
  const body = requestOnSubsCountdownExtensionAdapter({ data });
  const response = await postData('account/on-subs/request-extension', body);
  if (!response.error) response.message = 'You have successfully requested countdown extension';
  return {
    ...response,
  };
}
