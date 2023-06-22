import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACCOUNT } from '@/store/entities/user/types';

/* Services */
import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';
import { getSessionRole } from '@/utils/helpers';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async ({ charterer }) => {
  const [{ data: role }, { data: personalDetails }, { data: companyDetails }, { data: cargoesDetails }] =
    await Promise.all([
      getSessionRole(),
      getUserProfile(),
      getUserCompany(),
      charterer ? getChartererUserCargoes() : Promise.resolve({ data: {} }),
    ]);

  return {
    data: {
      role,
      personalDetails,
      companyDetails: {
        ...companyDetails,
        cargoesDetails,
      },
    },
  };
});
