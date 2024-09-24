import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { POSITIONS } from '@/store/entities/positions/types';

/* Services */
import { userTankersDetailsAdapter } from '@/adapters/vessel';
import { getUserPositionById, getUserPositions, getVesselsById } from '@/services';
import { calculateAmountOfPages } from '@/utils/helpers';

export const fetchUserVessels = createAsyncThunk(POSITIONS.GET_USER_POSITIONS, async ({ page, perPage, sortBy }) => {
  const { recordsTotal, data } = await getUserPositions({ page, perPage, sortBy });

  const { data: unassigned } = await getUserPositionById({ id: null });

  const vessels = await getVesselsById(data);

  const unassignedVessel = {
    title: 'Unassigned Fleet',
    activeTankers: unassigned?.filter((fleet) => fleet.appearsInSearch === true).length,
    inActiveTankers: unassigned?.filter((fleet) => fleet.appearsInSearch !== true).length,
    type: 'unassigned',
    tankers: userTankersDetailsAdapter({ data: unassigned }),
  };

  return {
    data: { vessels, unassigned: unassignedVessel, totalPages: calculateAmountOfPages(recordsTotal, perPage) },
  };
});
