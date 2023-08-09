import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { NEGOTIATING } from './types';

/* Services */
import { getCargoCounteroffers, getCargoFailedOffers, getCargoSentOffers } from '@/services/cargo';
import { getFailedOffers, getIncomingOffers, getSentCounteroffers } from '@/services/offer';

export const fetchNegotiatingOffers = createAsyncThunk(NEGOTIATING.GET_OFFERS, async ({ isOwner, id }) => {
  if (isOwner) {
    const [{ data: incomingOffersData }, { data: sentCounteroffersData }, { data: failedOffersData }] =
      await Promise.all([getIncomingOffers(id), getSentCounteroffers(id), getFailedOffers(id)]);
    return {
      data: {
        [id]: {
          incoming: incomingOffersData,
          sent: sentCounteroffersData,
          failed: failedOffersData,
        },
      },
    };
  }
  const [{ data: sentOffersData }, { data: counteroffersData }, { data: failedOffersData }] = await Promise.all([
    getCargoSentOffers(id),
    getCargoCounteroffers(id),
    getCargoFailedOffers(id),
  ]);

  return {
    data: {
      [id]: {
        incoming: sentOffersData,
        sent: counteroffersData,
        failed: failedOffersData,
      },
    },
  };
});
