import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POST_FIXTURE } from './types';

/* Services */
import { getPostFixtureOffers } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchPostFixtureOffers = createAsyncThunk(
  POST_FIXTURE.GET_POST_FIXTURE_OFFERS,
  async ({ page = 1, perPage = 5, filters = {}, sorting = {} }) => {
    const { data, recordsTotal } = await getPostFixtureOffers({ page, perPage, filters, sorting });

    return {
      data: {
        offers: data,
        totalPages: calculateAmountOfPages(recordsTotal, perPage),
        filters,
        sorting,
        perPage,
      },
    };
  }
);
