import { declineOfferAdapter, sendOfferAdapter, acceptOfferAdapter } from '@/adapters/offer';
import { postData } from '@/utils/dataFetching';

export async function sendOffer({ data }) {
  const body = sendOfferAdapter({ data });
  const response = await postData(`offer/send`, JSON.stringify(body));
  return {
    ...response,
  };
}

export async function declineOffer({ data }) {
  const body = declineOfferAdapter({ data });
  const response = await postData(`offer/decline`, JSON.stringify(body));
  return {
    ...response,
  };
}

export async function acceptOffer({ data }) {
  const body = acceptOfferAdapter({ data });
  const response = await postData(`offer/accept`, JSON.stringify(body));
  return {
    ...response,
  };
}

export async function sendCounteroffer({ data }) {
  const body = sendOfferAdapter({ data });
  const response = await postData(`counteroffer/send`, JSON.stringify(body));
  return {
    ...response,
  };
}
