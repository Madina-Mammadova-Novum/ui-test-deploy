import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACCOUNT } from '@/store/entities/user/types';

import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';
import { getCookieFromBrowser, getRoleIdentity } from '@/utils/helpers';

// eslint-disable-next-line no-unused-vars
export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async () => {
  const role = getCookieFromBrowser('session-user-role');

  const { isCharterer } = getRoleIdentity({ role });

  const [personalInfo, companyInfo, cargoeInfo] = await Promise.all([
    getUserProfile(),
    getUserCompany(),
    isCharterer ? getChartererUserCargoes() : Promise.resolve({}),
  ]);

  return {
    data: {
      personalDetails: personalInfo?.data,
      companyDetails: isCharterer ? { ...companyInfo?.data, cargoesDetails: cargoeInfo?.data } : companyInfo?.data,
    },
  };
});
