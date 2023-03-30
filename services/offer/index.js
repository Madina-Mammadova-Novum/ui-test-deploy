import { sendOfferAdapter } from '@/adapters/offer';
import { postData } from '@/utils/dataFetching';

export async function sendOffer({ data }) {
  const body = sendOfferAdapter({ data });
  const response = await postData(`offer/send`, JSON.stringify(body));
  return response;
}
