import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POSITIONS } from '@/store/entities/positions/types';

/* Services */
import { getUserPositions, getVesselsById } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchUserVessels = createAsyncThunk(POSITIONS.GET_USER_POSITIONS, async ({ page, perPage, sortBy }) => {
  const { recordsTotal, data } = await getUserPositions({ page, perPage, sortBy });

  const generator = getVesselsById(data);
  const { value } = generator.next();

  const vessels = await value;

  return {
    data: { vessels, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});
