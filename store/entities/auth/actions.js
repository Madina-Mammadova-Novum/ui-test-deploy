import { createAsyncThunk } from '@reduxjs/toolkit';

import { AUTH } from './types';

import { decodedTokenAdapter, signInAdapter, tokenAdapter, userRoleAdapter } from '@/adapters/user';
import { login } from '@/services';
import { sessionCookieData } from '@/utils/helpers';

export const signIn = createAsyncThunk(AUTH.SIGNIN, async ({ data }, { rejectWithValue }) => {
  const response = await login({ data: signInAdapter({ data }) });

  if (!response?.data?.access_token) {
    return rejectWithValue(response.error);
  }

  const { sub, role, ...rest } = decodedTokenAdapter(response.data.access_token);

  sessionCookieData(response.data, data.rememberMe);

  return {
    userId: sub,
    user: { ...rest },
    error: null,
    role: userRoleAdapter({ data: role }),
    ...tokenAdapter({ data: response.data }),
  };
});
