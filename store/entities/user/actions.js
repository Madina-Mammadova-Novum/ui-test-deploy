import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACCOUNT } from '@/store/entities/user/types';

/* Services */
import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async ({ charterer }) => {
  const [{ data: personalDetails }, { data: companyDetails }, { data: cargoesDetails }] = await Promise.all([
    getUserProfile(),
    getUserCompany(),
    charterer ? getChartererUserCargoes() : Promise.resolve({ data: {} }),
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
