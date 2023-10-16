import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ON_SUBS } from './types';

/* Services */
import { getRoleBasedOnSubs } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchOnSubsOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(ON_SUBS, async ({ page, perPage }) => {
    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getRoleBasedOnSubs({ page, perPage });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getRoleBasedOnSubs({ page, perPage });

    return {
      data: { offers: data, totalPages },
    };
  });
})();
