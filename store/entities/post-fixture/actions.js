import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POST_FIXTURE } from './types';

/* Services */
import { getPostFixtureOffers } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchPostFixtureOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(POST_FIXTURE, async ({ page, perPage, filters = {} }) => {
    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getPostFixtureOffers({ page, perPage, filters });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getPostFixtureOffers({ page, perPage, filters });

    return {
      data: { offers: data, totalPages, filters, perPage },
    };
  });
})();
