import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { USERS } from '@/store/entities/example/types';

/* Services */
import { getUsers } from '@/services/users';

export const fetchUsers = createAsyncThunk(USERS.GET_ALL, async () => {
  const data = await getUsers();
  return data;
});
