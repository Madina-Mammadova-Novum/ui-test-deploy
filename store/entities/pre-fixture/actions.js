import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { PRE_FIXTURE } from '@/store/entities/pre-fixture/types';

/* Services */
import { getRoleBasedPrefixture } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchPrefixtureOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(PRE_FIXTURE, async ({ page, perPage }) => {
    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getRoleBasedPrefixture({ page, perPage });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getRoleBasedPrefixture({ page, perPage });

    return {
      data: { offers: data || [], totalPages },
    };
  });
})();
