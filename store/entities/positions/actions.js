import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POSITIONS } from '@/store/entities/positions/types';

/* Services */
import { getUserPositions, getVesselsById } from '@/services';

export const fetchUserVessels = createAsyncThunk(POSITIONS.GET_USER_POSITIONS, async () => {
  const { data } = await getUserPositions();

  const generator = getVesselsById(data);
  const { value } = generator.next();

  return {
    data: { vessels: await value },
  };
});
