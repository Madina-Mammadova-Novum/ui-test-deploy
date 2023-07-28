import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { FLEETS } from '@/store/entities/fleets/types';

/* Services */
import { getUserFleets } from '@/services';
import { getFleetsVessels } from '@/services/vessel';

export const fetchFleetsWithVessels = (() => {
  return createAsyncThunk(FLEETS.GET_USER_FLEETS, async () => {
    const { data } = await getUserFleets();
    const generator = getFleetsVessels(data);
    const { value } = generator.next();

    return {
      data: await value,
    };
  });
})();
