import { createSlice } from '@reduxjs/toolkit';

import { fetchPostFixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  toggle: null,
  data: {
    offers: [],
    filters: {},
    filterData: {},
    sorting: {},
    totalPages: 0,
    perPage: 5,
  },
};

const postFixtureSlice = createSlice({
  name: 'postFixture',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    setSearchParams: (state, { payload }) => {
      state.data.searchParams = payload;
    },
    updateDocumentStatus: (state, action) => {
      const { documentId, status } = action?.payload;
      state.data.offers = state.data.offers.map((offer) => ({
        ...offer,
        documents: offer.documents.map((document) => (document.id === documentId ? { ...document, status } : document)),
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostFixtureOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostFixtureOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchPostFixtureOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateDocumentStatus, setToggle } = postFixtureSlice.actions;

export default postFixtureSlice.reducer;
