import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { NEGOTIATING } from './types';

/* Services */
import { getRoleBasedNegotiating } from '@/services';
import { getOffersById } from '@/services/offer';
import { calculateAmountOfPages, getCookieFromBrowser } from '@/utils/helpers';

export const fetchUserNegotiating = createAsyncThunk(NEGOTIATING.GET_DATA, async ({ page = 1, perPage = 5 }) => {
  const role = getCookieFromBrowser('session-user-role');

  const { data, recordsTotal } = await getRoleBasedNegotiating({ role, page, perPage });

  const generator = getOffersById({ data, role });
  const { value } = generator.next();

  const result = await value;

  const offerById = data.reduce((acc, item) => {
    acc[item.id] = result?.find((offer) => offer[item.id])[item.id];
    return acc;
  }, {});

  return {
    data: { offers: data, totalPages: calculateAmountOfPages(recordsTotal, perPage), offerById },
  };
});
