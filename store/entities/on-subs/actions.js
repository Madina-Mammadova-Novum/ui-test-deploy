import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ON_SUBS } from './types';

/* Services */
import { getChartererOnSubs, getOwnerOnSubs } from '@/services';
import { calculateAmountOfPages, getRoleIdentity } from '@/utils/helpers';

export const fetchOnSubsOffers = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(ON_SUBS, async ({ role, page, perPage }) => {
    const { isOwner } = getRoleIdentity({ role });
    const fetchByRole = isOwner ? getOwnerOnSubs : getChartererOnSubs;

    if (!totalPages || currentPerPage !== perPage) {
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
