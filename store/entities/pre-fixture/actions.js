import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { PRE_FIXTURE } from '@/store/entities/pre-fixture/types';

/* Services */
import { getRoleBasedPrefixture } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchPrefixtureOffers = createAsyncThunk(PRE_FIXTURE.GET_PRE_FIXTURE_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getRoleBasedPrefixture({ page, perPage });

  return {
    data: { offers: data, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});
