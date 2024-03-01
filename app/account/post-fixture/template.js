'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { setToggle } from '@/store/entities/post-fixture/slice';
import { getPostFixtureDataSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function PostFixtureLayout({ children }) {
  const dispatch = useDispatch();

  const { offers, totalPages, filters, sorting } = useSelector(getPostFixtureDataSelector);
  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(
      fetchPostFixtureOffers({
        page: paginationParams.currentPage,
        perPage: paginationParams.perPage,
        filters,
        sorting,
      })
    );
  }, [paginationParams.currentPage, paginationParams.perPage]);

  useEffect(() => {
    if (paginationParams.currentPage > 1) {
      paginationParams.handlePageChange({ selected: 0 });
    }
  }, [filters, sorting]);

  const layoutConfig = {
    withActions: false,
    data: { label: 'Offer stage #5', title: 'Post-fixture' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
