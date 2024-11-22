import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POST_FIXTURE } from './types';

/* Services */
import { getPostFixtureOffers } from '@/services';
import { getPostFixtureCargoCodes } from '@/services/cargo';
import { getCargoTypes } from '@/services/cargoTypes';
import { getPostFixtureTankerNames } from '@/services/vessel';
import { calculateAmountOfPages, convertDataToOptions, options } from '@/utils/helpers';

export const fetchPostFixtureOffers = createAsyncThunk(
  POST_FIXTURE.GET_POST_FIXTURE_OFFERS,
  async ({ page = 1, perPage = 5, searchParams = {}, sorting = {} }, { rejectWithValue }) => {
    const { data, recordsTotal } = await getPostFixtureOffers({ page, perPage, filters: searchParams, sorting });
    const cargoTypesData = await getCargoTypes();
    const cargoCodesData = await getPostFixtureCargoCodes();
    const tankerNamesData = await getPostFixtureTankerNames();

    if (!cargoCodesData.data || !tankerNamesData.data || !cargoTypesData.data) {
      rejectWithValue('Bad request', 'Temporary unavailable');
    }

    return {
      data: {
        offers: data,
        sorting,
        perPage,
        totalPages: calculateAmountOfPages(recordsTotal, perPage),
        filters: {
          cargoTypes: convertDataToOptions(cargoTypesData, 'id', 'name'),
          cargoCodes: options(cargoCodesData.data),
          tankerNames: options(tankerNamesData.data),
        },
        searchParams,
      },
    };
  }
);
