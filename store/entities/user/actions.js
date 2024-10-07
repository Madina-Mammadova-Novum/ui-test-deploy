import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACCOUNT } from '@/store/entities/user/types';

import { getChartererUserCargoes, getUserCompany, getUserProfile } from '@/services';
import { getCookieFromBrowser, getRoleIdentity } from '@/utils/helpers';

export const fetchUserProfileData = createAsyncThunk(ACCOUNT.GET_USER_PROFILE, async () => {
  const role = getCookieFromBrowser('session-user-role');

  const { isCharterer } = getRoleIdentity({ role });

  const personalInfo = await getUserProfile();
  const companyInfo = await getUserCompany();
  const cargoInfo = isCharterer ? await getChartererUserCargoes() : {};

  return {
    data: {
      personalDetails: personalInfo?.data,
      companyDetails: isCharterer ? { ...companyInfo?.data, cargoesDetails: cargoInfo?.data } : companyInfo?.data,
    },
  };
});
