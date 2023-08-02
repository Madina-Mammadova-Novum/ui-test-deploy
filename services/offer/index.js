import { acceptOfferAdapter, declineOfferAdapter, sendCounterofferAdapter, sendOfferAdapter } from '@/adapters/offer';
import { ROLES } from '@/lib';
import { getData, postData } from '@/utils/dataFetching';

export async function sendOffer({ data }) {
  const body = sendOfferAdapter({ data });
  const response = await postData(`offer/send`, JSON.stringify(body));
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
  if (!response.error) response.message = 'You have successfully submitted your application for an offer';
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

export async function getOfferDetails(offerId) {
  const response = await getData(`offer/details/${offerId}`);
  return {
    ...response,
  };
}
