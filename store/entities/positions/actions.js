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
      const { recordsTotal, recordsFiltered, data } = await getUserPositions({ page, perPage, sortBy });
      totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      currentPerPage = perPage;

      const generator = getVesselsById(data);
      const { value } = generator.next();

      return {
        data: { vessels: await value, totalPages },
      };
    }

    return {
      data: { vessels: [], totalPages: 0 },
    };
  });
})();
