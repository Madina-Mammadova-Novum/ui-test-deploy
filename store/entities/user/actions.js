import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { ACCOUNT } from '@/store/entities/user/types';

/* Services */
import { getUserCompany, getUserProfile } from '@/services';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async () => {
  const [{ data: personalDetails }, { data: companyDetails }] = await Promise.all([getUserProfile(), getUserCompany()]);

  return {
    data: {
      personalDetails,
      companyDetails,
    },
  };
});
