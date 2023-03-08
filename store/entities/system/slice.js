import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  sidebar: {
    open: false,
    resize: false,
    active: false,
    onFocus: false,
    search: '',
  },
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setOpen: (state, { payload }) => ({
      sidebar: {
        ...state.sidebar,
        open: payload ?? !state.sidebar.open,
      },
    }),
    setResize: (state) => ({
      sidebar: {
        ...state.sidebar,
        resize: !state.sidebar.resize,
      },
    }),
    setActive: (state, { payload }) => ({
      sidebar: {
        ...state.sidebar,
        active: payload,
      },
    }),
    setSearch: (state, { payload }) => ({
      sidebar: {
        ...state.sidebar,
        search: payload,
      },
    }),
    setFocus: (state, { payload }) => ({
      sidebar: {
        ...state.sidebar,
        onFocus: payload,
      },
    }),
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setOpen, setResize, setActive, setSearch, setFocus } = systemSlice.actions;

export default systemSlice.reducer;
