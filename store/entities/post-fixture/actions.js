import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POST_FIXTURE } from './types';

/* Services */
import { getPostFixtureOffers } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchPostFixtureOffers = createAsyncThunk(
  POST_FIXTURE.GET_POST_FIXTURE_OFFERS,
  async ({ page = 1, perPage = 5, searchParams = {}, sorting = {} }, { rejectWithValue }) => {
    try {
      const { data, recordsTotal } = await getPostFixtureOffers({
        page,
        perPage,
        filters: { ...searchParams, Stages: ['Post_Fixture'] },
        sorting,
      });

      return {
        data: {
          offers: data,
          sorting,
          perPage,
          totalPages: calculateAmountOfPages(recordsTotal, perPage),
          searchParams,
        },
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch post fixture offers');
    }
  }
);
