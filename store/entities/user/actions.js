import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACCOUNT } from '@/store/entities/user/types';

/* Services */
import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async ({ isCharterer }) => {
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
