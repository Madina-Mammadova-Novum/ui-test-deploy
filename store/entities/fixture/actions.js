import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { FIXTURE } from './types';

/* Services */
import { getFixtureOffers } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchFixtureOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(FIXTURE, async ({ page, perPage }) => {
    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getFixtureOffers({ page, perPage });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getFixtureOffers({ page, perPage });

    return {
      data: { offers: data, totalPages },
    };
  });
})();
