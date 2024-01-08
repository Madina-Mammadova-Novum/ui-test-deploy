import { createAsyncThunk } from '@reduxjs/toolkit';

import { AUTH } from './types';

import { decodedTokenAdapter, signInAdapter, tokenAdapter, userRoleAdapter } from '@/adapters/user';
import { login } from '@/services';
import { setCookie } from '@/utils/helpers';

export const signIn = createAsyncThunk(AUTH.SIGNIN, async ({ data }, { rejectWithValue }) => {
  const response = await login({ data: signInAdapter({ data }) });

  if (!response?.data?.access_token) {
    return rejectWithValue(response.error);
  }

  const { sub, role, ...rest } = decodedTokenAdapter(response?.data?.access_token);

  setCookie('session-access-token', response.data.access_token);
  setCookie('session-refresh-token', response.data.refresh_token);
  setCookie('session-user-role', userRoleAdapter({ data: role }));

  return {
    userId: sub,
    user: { ...rest },
    error: null,
    role: userRoleAdapter({ data: role }),
    ...tokenAdapter({ data: response.data }),
  };
});
