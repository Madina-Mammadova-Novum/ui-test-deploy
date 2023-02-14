import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: {
    open: false,
    resize: false,
    active: false,
    search: '',
  },
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setOpen: (state) => ({
      sidebar: {
        ...state.sidebar,
        open: !state.sidebar.open,
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
  },
});

export const { setOpen, setResize, setActive, setSearch } = systemSlice.actions;

export default systemSlice.reducer;
