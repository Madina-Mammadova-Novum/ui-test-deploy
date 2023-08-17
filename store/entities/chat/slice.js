import { createSlice } from '@reduxjs/toolkit';
/* Actions */
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  data: [],
  pending: false,
  error: false,
  connected: false,
  activeConversations: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export const { rehydrate } = chatSlice.actions;

export default chatSlice.reducer;
