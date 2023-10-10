import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POSITIONS } from '@/store/entities/positions/types';

/* Services */
import { getUserPositions, getVesselsById } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchUserVessels = (() => {
  let totalPages;
  let currentPerPage;

  return createAsyncThunk(POSITIONS.GET_USER_POSITIONS, async ({ page, perPage, sortBy }) => {
    if (!totalPages || currentPerPage !== perPage) {
      const { recordsTotal, recordsFiltered } = await getUserPositions({ page, perPage, sortBy });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;
    }

    const { data } = await getUserPositions({ page, perPage, sortBy });
    const generator = getVesselsById(data);
    const { value } = generator.next();

    return {
      data: { vessels: await value, totalPages },
    };
  });
})();
