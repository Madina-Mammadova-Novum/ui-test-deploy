import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { FAILED_OFFERS } from './types';

/* Services */
import { getFailedOffers } from '@/services/user';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchFailedOffers = createAsyncThunk(
  FAILED_OFFERS.GET_FAILED_OFFERS,
  async ({ page = 1, perPage = 5, searchParams = {}, sorting = {} }, { rejectWithValue }) => {
    try {
      const { data, recordsTotal } = await getFailedOffers({ page, perPage, filters: searchParams, sorting });

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
      return rejectWithValue('Failed to fetch failed offers');
    }
  }
);
