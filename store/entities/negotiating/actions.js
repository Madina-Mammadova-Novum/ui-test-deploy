import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { NEGOTIATING } from './types';

/* Services */
import { getRoleBasedNegotiating } from '@/services';
import { getOffersById } from '@/services/offer';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchUserNegotiating = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(NEGOTIATING.GET_DATA, async ({ page, perPage }, { getState }) => {
    const { role } = getState().user;

    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getRoleBasedNegotiating({ page, perPage });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getRoleBasedNegotiating({ page, perPage });

    const generator = getOffersById({ data, role });
    const { value } = generator.next();

    const res = await value;

    const offerById = data.reduce((acc, item) => {
      acc[item.id] = res?.find((offer) => offer[item.id])[item.id];
      return acc;
    }, {});

    return {
      data: { offers: data, totalPages, offerById },
    };
  });
})();
