import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { FIXTURE } from './types';

/* Services */
import { getFixtureOffers } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchFixtureOffers = createAsyncThunk(FIXTURE.GET_FIXTURE_OFFERS, async ({ page, perPage }) => {
  const { data, recordsTotal } = await getFixtureOffers({ page, perPage });

  return {
    data: { offers: data, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});
