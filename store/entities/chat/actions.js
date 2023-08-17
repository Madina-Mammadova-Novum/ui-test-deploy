import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */

/* Services */
import { CHAT } from './types';

export const fetchUserChat = createAsyncThunk(CHAT.INIT, async () => {});
