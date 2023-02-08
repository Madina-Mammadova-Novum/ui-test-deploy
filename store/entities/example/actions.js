import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { USERS } from './types';

/* Services */
import { getUsers } from '@/services/page';

export const fetchUsers = createAsyncThunk(USERS.GET_ALL, async () => {
  const data = await getUsers();
  return data;
});
