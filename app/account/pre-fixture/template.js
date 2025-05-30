'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'next/navigation';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchPrefixtureOffers } from '@/store/entities/pre-fixture/actions';
import { setToggle } from '@/store/entities/pre-fixture/slice';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function PreFixtureLayout({ children }) {
  const dispatch = useDispatch();
  const searchedParams = useParams();

  const { offers, totalPages } = useSelector(getPreFixtureDataSelector);
  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchPrefixtureOffers({ page: paginationParams.currentPage, perPage: paginationParams.perPage }));
  }, [paginationParams.currentPage, paginationParams.perPage]);

  const layoutConfig = {
    withActions: false,
    useExpand: true,
    usePagination: !searchedParams.id,
    data: { label: 'Offer stage #2', title: 'Pre-fixture' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
