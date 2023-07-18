import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POSITIONS } from '@/store/entities/positions/types';

/* Services */
import { getUserPositions, getVesselsById } from '@/services';

export const fetchUserVessels = createAsyncThunk(POSITIONS.GET_USER_POSITIONS, async ({ page, perPage, sortBy }) => {
  const { data, recordsTotal } = await getUserPositions({ page, perPage, sortBy });

  const generator = getVesselsById(data);
  const { value } = generator.next();

  return {
    data: { vessels: await value, totalPages: recordsTotal },
  };
});
