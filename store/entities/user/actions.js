import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACCOUNT } from '@/store/entities/user/types';

import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';
import { getRoleIdentity } from '@/utils/helpers';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async (_, { getState }) => {
  const { role } = getState().user;

  const { isCharterer } = getRoleIdentity({ role });

  const [{ data: personalDetails }, { data: companyDetails }, { data: cargoesDetails }] = await Promise.all([
    getUserProfile(),
    getUserCompany(),
    isCharterer ? getChartererUserCargoes() : Promise.resolve({}),
  ]);

  return {
    data: {
      personalDetails,
      companyDetails: {
        ...companyDetails,
        cargoesDetails,
      },
    },
  };
});
