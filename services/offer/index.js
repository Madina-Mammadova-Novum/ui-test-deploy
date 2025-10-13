import { requestAcceptPrefixtureAdapter } from '@/adapters';
import {
  acceptOfferAdapter,
  declineOfferAdapter,
  sendCounterofferAdapter,
  sendCounterOfferValidationAdapter,
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

export async function sendCounterOfferValidation(tankerId) {
  const body = sendCounterOfferValidationAdapter(tankerId);
  const response = await postData(`offer/charterer/counter-validation`, body);

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
  if (!response.error) response.message = 'You have successfully declined the offer';
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

async function getAllOffers({ id, role }) {
  const response = await getData(`vessels/${role}-offers/${id}`);

  return {
    ...response,
  };
}

async function getOffers({ id, role }) {
  const allOffersData = await getAllOffers({ id, role });

  const roleBasedMapping = {
    charterer: {
      Incoming: 'sent',
      Sent: 'incoming',
      Declined: 'failed',
    },
    owner: {
      Incoming: 'incoming',
      Sent: 'sent',
      Declined: 'failed',
    },
  };

  const groupByName = (tabs, mapping) => {
    return tabs.reduce(
      (acc, tab) => {
        const targetKey = mapping[tab.name];
        if (targetKey) {
          acc[targetKey].push(...tab.items);
        }
        return acc;
      },
      { incoming: [], sent: [], failed: [] }
    );
  };

  const mapping = roleBasedMapping[role] || {};
  const groupedTabs = groupByName(allOffersData?.data?.tabs, mapping);

  return {
    [id]: groupedTabs,
  };
}

export function* getOffersById({ data, role }) {
  return yield Promise.all(data.map(({ id }) => getOffers({ id, role })));
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

export async function getPdfToView(offerId) {
  const path = `account/on-subs/recap/${offerId}`;

  const response = await getData(path, null, 'pdf');

  return {
    ...response,
  };
}
