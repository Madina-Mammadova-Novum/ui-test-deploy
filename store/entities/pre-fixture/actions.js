import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { PRE_FIXTURE } from '@/store/entities/pre-fixture/types';

/* Services */
import { getChartererPrefixture, getOwnerPrefixture } from '@/services';
import { calculateAmountOfPages, getRoleIdentity } from '@/utils/helpers';

export const fetchPrefixtureOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(PRE_FIXTURE, async ({ role, page, perPage }) => {
    const { isOwner } = getRoleIdentity({ role });
    const fetchByRole = isOwner ? getOwnerPrefixture : getChartererPrefixture;

    if (typeof totalPages === 'undefined' || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await fetchByRole({ page, perPage });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await fetchByRole({ page, perPage });

    return {
      data: { offers: data, totalPages },
    };
  });
})();
