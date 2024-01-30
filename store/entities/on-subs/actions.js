import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ON_SUBS } from './types';

/* Services */
import { getRoleBasedOnSubs } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchOnSubsOffers = createAsyncThunk(ON_SUBS.GET_ON_SUBS_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getRoleBasedOnSubs({ page, perPage });

  return {
    data: { offers: data, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});
